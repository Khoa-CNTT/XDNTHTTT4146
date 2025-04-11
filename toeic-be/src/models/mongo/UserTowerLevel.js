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

class UserTowerLevelClass {
  /**
   * Lấy toàn bộ tiến độ của user trong một tower
   */
  static async getTowerProgress(userId, towerId) {
    return this.find({ userId, towerId }).populate("levelId");
  }

  /**
   * Cập nhật tiến độ
   */
  async updateProgress(newProgress) {
    this.progress = Math.min(newProgress, 100);

    if (this.progress >= 100 && !this.completed) {
      return this.markCompleted();
    }

    return this.save();
  }

  /**
   * Đánh dấu hoàn thành level
   */
  async markCompleted() {
    if (this.completed) return this;
    this.completed = true;
    this.progress = 100;
    return this.save();
  }

  /**
   * Reset lại tiến độ (nếu học lại)
   */
  async resetProgress() {
    this.progress = 0;
    this.completed = false;
    return this.save();
  }
}

userTowerLevelSchema.loadClass(UserTowerLevelClass);

const UserTowerLevel = mongoose.model("UserTowerLevel", userTowerLevelSchema);
module.exports = UserTowerLevel;
