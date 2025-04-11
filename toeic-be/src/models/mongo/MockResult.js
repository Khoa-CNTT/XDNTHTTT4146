const mongoose = require("mongoose");

const MockResultSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    testType: {
      type: String,
      enum: ["full", "mini", "part"],
      default: "full",
    },
    parts: {
      type: [Number],
      default: [],
      comment: "Các part được luyện trong bài",
    },
    totalScore: { type: Number, required: true },
    correctAnswers: { type: Number },
    totalQuestions: { type: Number },
    timeSpent: { type: Number, default: 0 }, // seconds
    startedAt: { type: Date },
    completedAt: { type: Date },

    meta: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    isPassed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MockResult", MockResultSchema);
