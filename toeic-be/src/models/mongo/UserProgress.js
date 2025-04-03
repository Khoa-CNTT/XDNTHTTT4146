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
    progress: { type: Number, default: 0, min: 0, max: 100 }, // % hoàn thành bài học
    status: {
      type: String,
      enum: ["not_started", "in_progress", "completed"],
      default: "not_started",
    },
    wordsLearned: { type: Number, default: 0 }, // Từ vựng đã học
    expGained: { type: Number, default: 0 }, // Điểm kinh nghiệm kiếm được
  },
  { timestamps: true } // Tự động thêm createdAt, updatedAt
);

class UserProgressClass {
  static async findByUserAndLesson(userId, lessonId) {
    return this.findOne({ userId, lessonId });
  }

  async updateProgress(newProgress) {
    if (newProgress < 0 || newProgress > 100) {
      throw new Error("Progress must be between 0 and 100");
    }

    this.progress = newProgress;
    this.status = this.progress === 100 ? "completed" : "in_progress";
    return this.save();
  }

  async markAsCompleted() {
    this.status = "completed";
    this.progress = 100;
    return this.save();
  }

  static async getUserProgress(userId) {
    return this.find({ userId }).populate("lessonId");
  }
}

userProgressSchema.loadClass(UserProgressClass);

const UserProgress = mongoose.model("UserProgress", userProgressSchema);
module.exports = UserProgress;
