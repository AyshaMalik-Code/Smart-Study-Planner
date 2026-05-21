const router = require("express").Router();
const User = require("../models/User");

// SAVE
router.post("/", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json(user);
});

// GET
router.get("/", async (req, res) => {
  const user = await User.findOne();
  res.json(user);
});

module.exports = router;