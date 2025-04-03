const mongoose = require("mongoose");

const LevelSchema = new mongoose.Schema(
  {
    levelName: { type: String, required: true },
    targetScore: { type: Number, required: true },
    description: { type: String, required: true },
    studyGoal: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Level", LevelSchema);
