const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ["user", "developer", "admin", "tester"],
    default: "user",
  },
});

module.exports = mongoose.model("User", userSchema);