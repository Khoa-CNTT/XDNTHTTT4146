const mongoose = require("mongoose");

const CourseProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },

    // Các bài học đã hoàn thành
    completedLessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],
    totalLessons: { type: Number, default: 0 },

    // Điểm từng quiz
    quizScores: [
      {
        quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
        score: Number,
        attempts: { type: Number, default: 1 },
        lastAttemptAt: { type: Date, default: Date.now },
      },
    ],

    // Track hoạt động
    lastActivityAt: { type: Date, default: Date.now },
    firstStartedAt: { type: Date, default: Date.now },

    // Trạng thái
    status: {
      type: String,
      enum: ["not_started", "in_progress", "completed"],
      default: "not_started",
    },

    // EXP/xu đã nhận được từ course này
    rewardLog: [
      {
        rewardId: { type: mongoose.Schema.Types.ObjectId, ref: "Reward" },
        receivedAt: Date,
        type: String, // "exp" | "coin" | "badge"
        value: Number,
      },
    ],

    // Tính toán tỷ lệ hoàn thành (nếu cần)
    completionRate: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },

    // Flag check đã claim phần thưởng course chưa
    rewardClaimed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Có thể thêm index tổng hợp để đảm bảo không trùng course/user
CourseProgressSchema.index({ userId: 1, courseId: 1 }, { unique: true });

module.exports = mongoose.model("CourseProgress", CourseProgressSchema);
