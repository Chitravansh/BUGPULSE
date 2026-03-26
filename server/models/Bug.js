const mongoose = require("mongoose");

const bugSchema = new mongoose.Schema({
  title: String,
  description: String,
  priority: String,
  status: { type: String, default: "open" },

   duplicateOf: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bug",
    default: null
  },

  similarityScore: {
    type: Number,
    default: 0
  },

  image: { type: String, default: null }, // ✅ ADD THIS


  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Bug", bugSchema);
