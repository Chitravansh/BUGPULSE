const router = require("express").Router();
const Bug = require("../models/Bug");
const vectorize = require("../ai/vectorizer");
const { loadModel, predict } = require("../ai/model");
const cosineSimilarity = require("../ai/similarity");
const multer = require("multer");
const path = require("path");
const auth = require("../middleware/auth");


loadModel();
// Multer Config
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });



router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    // 🔥 SAFE ACCESS
    const title = req.body?.title;
    const description = req.body?.description;
    console.log("FILE:", req.file);
    console.log("BODY:", req.body);

    if (!title || !description) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const vector = vectorize(description);
    const priority = await predict(vector);

    const existingBugs = await Bug.find();

    let duplicateOf = null;
    let maxSimilarity = 0;

    for (const bug of existingBugs) {
      const oldVector = vectorize(bug.description);
      const sim = cosineSimilarity(vector, oldVector);

      if (sim > maxSimilarity) {
        maxSimilarity = sim;
        duplicateOf = bug._id;
      }
    }

    if (maxSimilarity < 0.85) duplicateOf = null;

    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const newBug = await Bug.create({
      title,
      description,
      priority,
      duplicateOf,
      similarityScore: maxSimilarity,
      image: imagePath,
    });

    global.io.emit("bugCreated", newBug); //socket io event

    res.json(newBug);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


// update status
router.put("/:id/status",auth, async (req, res) => {
  const { status } = req.body;

    if (!["developer", "tester", "admin"].includes(req.user.role)) {
    return res.status(403).json({ error: "Access denied" });
  }

  const bug = await Bug.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  //socket io event
  global.io.emit("bugUpdated", bug);

  res.json(bug);
});

//Get All Bugs

router.get("/", auth, async (req, res) => {
  try {
    const bugs = await Bug.find().sort({ createdAt: -1 });
    res.json(bugs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", auth, async (req, res) => {

    if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Only admin can delete bugs" });
  }


  try {
    await Bug.findByIdAndDelete(req.params.id);
    global.io.emit("bugDeleted", req.params.id);
    res.json({ message: "Bug deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ====================Analytics_Serction===================================\\

router.get("/analytics", auth, async (req, res) => {
  try {
    const bugs = await Bug.find();

    const total = bugs.length;

    const statusCount = {
      open: bugs.filter(b => b.status === "open").length,
      inProgress: bugs.filter(b => b.status === "in-progress").length,
      fixed: bugs.filter(b => b.status === "fixed").length,
    };

    const priorityCount = {
      high: bugs.filter(b => b.priority === "high").length,
      medium: bugs.filter(b => b.priority === "medium").length,
      low: bugs.filter(b => b.priority === "low").length,
    };

    res.json({ total, statusCount, priorityCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




module.exports = router;
