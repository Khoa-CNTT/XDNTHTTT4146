const mongoose = require("mongoose");

const CourseProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    completedLessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],
    totalLessons: { type: Number, default: 0 },

    quizScores: [
      {
        quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
        score: Number,
        attempts: Number,
        lastAttemptAt: Date,
      },
    ],

    lastActivityAt: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["in_progress", "completed"],
      default: "in_progress",
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.CourseProgress ||
  mongoose.model("CourseProgress", CourseProgressSchema);
