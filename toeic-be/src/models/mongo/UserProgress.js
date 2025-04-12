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
    try {
      return await this.findOne({ userId, lessonId });
    } catch (error) {
      throw new Error(
        "Error finding user progress by lesson: " + error.message
      );
    }
  }

  /**
   * Lấy toàn bộ tiến độ học của người dùng (kèm lesson)
   */
  static async getUserProgress(userId) {
    try {
      return await this.find({ userId }).populate("lessonId");
    } catch (error) {
      throw new Error("Error fetching user progress: " + error.message);
    }
  }

  /**
   * Kiểm tra bài học đã hoàn thành chưa
   */
  static async isLessonCompleted(userId, lessonId) {
    try {
      const progress = await this.findOne({ userId, lessonId });
      return progress?.status === "completed";
    } catch (error) {
      throw new Error(
        "Error checking if lesson is completed: " + error.message
      );
    }
  }

  /**
   * Tính tổng EXP của người dùng
   */
  static async getTotalExp(userId) {
    try {
      const result = await this.aggregate([
        { $match: { userId: new mongoose.Types.ObjectId(userId) } },
        { $group: { _id: null, totalExp: { $sum: "$expGained" } } },
      ]);
      return result[0]?.totalExp || 0;
    } catch (error) {
      throw new Error("Error calculating total EXP: " + error.message);
    }
  }

  /**
   * Cập nhật tiến độ
   */
  async updateProgress(newProgress, words = 0, exp = 0) {
    try {
      if (newProgress < 0 || newProgress > 100) {
        throw new Error("Progress must be between 0 and 100");
      }

      // Cập nhật tiến độ bài học
      this.progress = Math.max(this.progress, newProgress);
      this.wordsLearned += words;
      this.expGained += exp;
      this.lastActivityAt = new Date();

      // Đánh dấu trạng thái bài học
      if (this.progress >= 100) {
        this.status = "completed";
        this.progress = 100;
      } else if (this.progress > 0) {
        this.status = "in_progress";
      }

      return this.save();
    } catch (error) {
      throw new Error("Error updating progress: " + error.message);
    }
  }

  /**
   * Đánh dấu hoàn thành bài học
   */
  async markAsCompleted() {
    try {
      this.status = "completed";
      this.progress = 100;
      this.lastActivityAt = new Date();
      return this.save();
    } catch (error) {
      throw new Error("Error marking lesson as completed: " + error.message);
    }
  }

  /**
   * Reset lại tiến độ bài học (nếu muốn học lại)
   */
  async resetProgress() {
    try {
      this.progress = 0;
      this.status = "not_started";
      this.wordsLearned = 0;
      this.expGained = 0;
      this.lastActivityAt = null;
      return this.save();
    } catch (error) {
      throw new Error("Error resetting progress: " + error.message);
    }
  }

  /**
   * Cập nhật số lượng từ học được và EXP trong tiến độ
   */
  async updateWordsAndExp(words = 0, exp = 0) {
    try {
      this.wordsLearned += words;
      this.expGained += exp;
      this.lastActivityAt = new Date();
      return this.save();
    } catch (error) {
      throw new Error(
        "Error updating words learned and exp gained: " + error.message
      );
    }
  }
}

userProgressSchema.loadClass(UserProgressClass);

const UserProgress = mongoose.model("UserProgress", userProgressSchema);
module.exports = UserProgress;
