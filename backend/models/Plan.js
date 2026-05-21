const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  title: String,
  subject: String,
  priority: String,
  reminderTime: String,
  status: {
    type: String,
    default: "Pending"
  }
});

module.exports = mongoose.model("Plan", planSchema);