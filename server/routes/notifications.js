const router = require("express").Router();
const Notification = require("../models/Notification");
const auth = require("../middleware/auth");

// GET latest notifications
router.get("/", auth, async (req, res) => {
  try {
    const notifications = await Notification.find()
      .sort({ createdAt: -1 })
      .limit(10);

    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;