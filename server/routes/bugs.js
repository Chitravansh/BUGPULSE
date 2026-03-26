const router = require("express").Router();
const Bug = require("../models/Bug");
const vectorize = require("../ai/vectorizer");
const { loadModel, predict } = require("../ai/model");
const cosineSimilarity = require("../ai/similarity");
const multer = require("multer");
const path = require("path");


loadModel();
// Multer Config
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// router.post("/", async (req, res) => {
//   const { title, description } = req.body;

//   const vector = vectorize(description);
//   const priority = await predict(vector);

//   const bug = await Bug.create({
//     title,
//     description,
//     priority
//   });

//   res.json(bug);
// });

// router.get("/", async (req, res) => {
//   const bugs = await Bug.find();
//   res.json(bugs);
// });

// router.post("/", async (req, res) => {
//   const { title, description } = req.body;

//   const vector = vectorize(description);

//   // 1️⃣ Predict priority
//   const priority = await predict(vector);

//   // 2️⃣ Check duplicates
//   const existingBugs = await Bug.find();

//   let duplicateOf = null;
//   let maxSimilarity = 0;

//   for (const bug of existingBugs) {
//     const oldVector = vectorize(bug.description);
//     const sim = cosineSimilarity(vector, oldVector);

//     if (sim > maxSimilarity) {
//       maxSimilarity = sim;
//       duplicateOf = bug._id;
//     }
//   }

//   // threshold
//   if (maxSimilarity < 0.85) {
//     duplicateOf = null;
//   }

//    // 🔹 File upload path
//   const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

//   const newBug = await Bug.create({
//     title,
//     description,
//     priority,
//     duplicateOf,
//     similarityScore: maxSimilarity,
//      image: imagePath
//   });

//   res.json(newBug);
// });

//post status

router.post("/", upload.single("image"), async (req, res) => {
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

    res.json(newBug);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


// update status
router.put("/:id/status", async (req, res) => {
  const { status } = req.body;

  const bug = await Bug.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  res.json(bug);
});

//Get All Bugs

router.get("/", async (req, res) => {
  try {
    const bugs = await Bug.find().sort({ createdAt: -1 });
    res.json(bugs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Bug.findByIdAndDelete(req.params.id);
    res.json({ message: "Bug deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
