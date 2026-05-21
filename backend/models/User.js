const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    password: {
      type: String,
      required: true
    },

    goal: {
      type: String, // e.g. "Crack MCA", "Web Dev"
    },

    level: {
      type: String, // Beginner / Intermediate / Advanced
    }
  },
  {
    timestamps: true,
    collection: "users"
  }
);

module.exports = mongoose.model("User", userSchema);