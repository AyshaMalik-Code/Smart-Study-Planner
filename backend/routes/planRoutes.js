const express = require("express");
const router = express.Router();
const Plan = require("../models/Plan");

// GET
router.get("/", async (req, res) => {
  const plans = await Plan.find();
  res.json(plans);
});

// POST
router.post("/", async (req, res) => {
  const plan = new Plan(req.body);
  await plan.save();
  res.json(plan);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Plan.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

// TOGGLE
router.put("/:id", async (req, res) => {
  const plan = await Plan.findById(req.params.id);

  plan.status = plan.status === "Pending" ? "Completed" : "Pending";

  await plan.save();
  res.json(plan);
});

module.exports = router;