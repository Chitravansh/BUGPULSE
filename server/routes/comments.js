// const router = require("express").Router();
// const Comment = require("../models/Comment");
// const auth = require("../middleware/auth");

// //===========================Comments=======================\\

// router.post("/comments", auth, async (req, res) => {
//   const comment = await Comment.create({
//     bugId: req.body.bugId,
//     user: req.user.role,
//     text: req.body.text,
//   });
//   res.json(comment);
// });

// router.get("/comments/:bugId", auth, async (req, res) => {
//   const comments = await Comment.find({ bugId: req.params.bugId });
//   res.json(comments);
// });

// router.delete("/:id", auth, async (req, res) => {
//   if (req.user.role !== "admin") {
//     return res.status(403).json({ error: "Only admin can delete" });
//   }

//   await Comment.findByIdAndDelete(req.params.id);

//   res.json({ message: "Comment deleted" });
// });
// //===============================================================

// module.exports = router;


const router = require("express").Router();
const Comment = require("../models/Comment");
const auth = require("../middleware/auth");

// CREATE COMMENT
router.post("/", auth, async (req, res) => {
  const comment = await Comment.create({
    bugId: req.body.bugId,
    user: req.user.role,
    text: req.body.text,
    parentId: req.body.parentId || null, // 🔥 for replies
  });

  global.io.emit("commentAdded", comment);
  
  res.json(comment);
});

// GET COMMENTS
router.get("/:bugId", auth, async (req, res) => {
  const comments = await Comment.find({ bugId: req.params.bugId })
    .sort({ createdAt: 1 });

  res.json(comments);
});

// DELETE COMMENT (ADMIN)
router.delete("/:id", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Only admin can delete" });
  }

  await Comment.findByIdAndDelete(req.params.id);

  res.json({ message: "Comment deleted" });
});

module.exports = router; // 🔥 MUST ADD