const Plan = require("../models/Plan");

exports.getPlans = async (req,res)=>{
  const plans = await Plan.find();
  res.json(plans);
};

exports.addPlan = async (req,res)=>{
  const plan = new Plan(req.body);
  await plan.save();
  res.json(plan);
};

exports.updateStatus = async (req,res)=>{
  const plan = await Plan.findById(req.params.id);
  plan.status = "Completed";
  await plan.save();
  res.json(plan);
};