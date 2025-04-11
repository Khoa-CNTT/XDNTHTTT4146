const mongoose = require("mongoose");

const userProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
      required: true,
      index: true,
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
      index: true,
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
      default: null,
    },
  },
  { timestamps: true }
);

// Đảm bảo mỗi user chỉ có 1 progress cho 1 bài học
userProgressSchema.index({ userId: 1, lessonId: 1 }, { unique: true });

class UserProgressClass {
  /**
   * Tìm tiến độ học theo người dùng và bài học
   */
  static async findByUserAndLesson(userId, lessonId) {
    return this.findOne({ userId, lessonId });
  }

  /**
   * Lấy toàn bộ tiến độ học của người dùng (kèm lesson)
   */
  static async getUserProgress(userId) {
    return this.find({ userId }).populate("lessonId");
  }

  /**
   * Kiểm tra bài học đã hoàn thành chưa
   */
  static async isLessonCompleted(userId, lessonId) {
    const progress = await this.findOne({ userId, lessonId });
    return progress?.status === "completed";
  }

  /**
   * Tính tổng EXP của người dùng
   */
  static async getTotalExp(userId) {
    const result = await this.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: null, totalExp: { $sum: "$expGained" } } },
    ]);
    return result[0]?.totalExp || 0;
  }

  /**
   * Cập nhật tiến độ
   */
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
    } else if (this.progress > 0) {
      this.status = "in_progress";
    }

    return this.save();
  }

  /**
   * Đánh dấu hoàn thành bài học
   */
  async markAsCompleted() {
    this.status = "completed";
    this.progress = 100;
    this.lastActivityAt = new Date();
    return this.save();
  }

  /**
   * Reset lại tiến độ bài học (nếu muốn học lại)
   */
  async resetProgress() {
    this.progress = 0;
    this.status = "not_started";
    this.wordsLearned = 0;
    this.expGained = 0;
    this.lastActivityAt = null;
    return this.save();
  }
}

userProgressSchema.loadClass(UserProgressClass);

const UserProgress = mongoose.model("UserProgress", userProgressSchema);
module.exports = UserProgress;
