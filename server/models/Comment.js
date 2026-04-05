const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  bugId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bug",
  },
  user: String,
  text: String,

  // 🔥 NEW: reply support
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
    default: null,
  },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Comment", commentSchema);