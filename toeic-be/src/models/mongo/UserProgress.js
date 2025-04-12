const mongoose = require("mongoose");

const userProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  vocabularyLearned: {
    type: Number,
    default: 0,
  },
  mockTestScores: {
    type: [Number],
  },
  gamesPlayed: {
    type: Number,
    default: 0,
  },
  completedLevels: {
    type: Number,
    default: 0,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

const UserProgress = mongoose.model("UserProgress", userProgressSchema);

module.exports = UserProgress;
