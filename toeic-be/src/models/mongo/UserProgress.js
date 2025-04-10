const mongoose = require("mongoose");

const userProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
      required: true,
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    status: {
      type: String,
      enum: ["not_started", "in_progress", "completed"],
      default: "not_started",
    },
    wordsLearned: {
      type: Number,
      default: 0,
      min: 0,
    },
    expGained: {
      type: Number,
      default: 0,
      min: 0,
    },
    lastActivityAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

class UserProgressClass {
  static async findByUserAndLesson(userId, lessonId) {
    return this.findOne({ userId, lessonId });
  }

  static async getUserProgress(userId) {
    return this.find({ userId }).populate("lessonId");
  }

  async updateProgress(newProgress, words = 0, exp = 0) {
    if (newProgress < 0 || newProgress > 100) {
      throw new Error("Progress must be between 0 and 100");
    }

    this.progress = Math.max(this.progress, newProgress);
    this.wordsLearned += words;
    this.expGained += exp;
    this.lastActivityAt = new Date();

    if (this.progress >= 100) {
      this.status = "completed";
      this.progress = 100;
    } else {
      this.status = "in_progress";
    }

    return this.save();
  }

  async markAsCompleted() {
    this.status = "completed";
    this.progress = 100;
    this.lastActivityAt = new Date();
    return this.save();
  }
}

userProgressSchema.loadClass(UserProgressClass);

const UserProgress = mongoose.model("UserProgress", userProgressSchema);
module.exports = UserProgress;
