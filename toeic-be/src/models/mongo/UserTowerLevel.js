const mongoose = require("mongoose");

const userTowerLevelSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    towerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tower",
      required: true,
      index: true,
    },
    levelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TowerLevel",
      required: true,
      index: true,
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Unique đảm bảo không bị trùng cấp độ trong 1 tháp cho mỗi người dùng
userTowerLevelSchema.index(
  { userId: 1, towerId: 1, levelId: 1 },
  { unique: true }
);

// Class để hỗ trợ các phương thức cho mô hình này
class UserTowerLevelClass {
  /**
   * Lấy toàn bộ tiến độ của user trong một tower
   */
  static async getTowerProgress(userId, towerId) {
    try {
      const result = await this.find({ userId, towerId }).populate("levelId");
      return result;
    } catch (error) {
      throw new Error("Error fetching tower progress: " + error.message);
    }
  }

  /**
   * Cập nhật tiến độ
   */
  async updateProgress(newProgress) {
    try {
      this.progress = Math.min(newProgress, 100);

      // Nếu tiến độ đạt 100 và chưa hoàn thành thì đánh dấu hoàn thành
      if (this.progress >= 100 && !this.completed) {
        return this.markCompleted();
      }

      return this.save();
    } catch (error) {
      throw new Error("Error updating progress: " + error.message);
    }
  }

  /**
   * Đánh dấu hoàn thành level
   */
  async markCompleted() {
    try {
      if (this.completed) return this; // Nếu đã hoàn thành thì không thay đổi

      this.completed = true;
      this.progress = 100;
      return this.save();
    } catch (error) {
      throw new Error("Error marking level as completed: " + error.message);
    }
  }

  /**
   * Reset lại tiến độ (nếu học lại)
   */
  async resetProgress() {
    try {
      this.progress = 0;
      this.completed = false;
      return this.save();
    } catch (error) {
      throw new Error("Error resetting progress: " + error.message);
    }
  }
}

// Tải class vào schema
userTowerLevelSchema.loadClass(UserTowerLevelClass);

// Tạo model từ schema
const UserTowerLevel = mongoose.model("UserTowerLevel", userTowerLevelSchema);
module.exports = UserTowerLevel;
