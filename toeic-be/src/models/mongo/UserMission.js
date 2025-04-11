const mongoose = require("mongoose");

const userMissionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    missionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DailyMission",
      required: true,
      index: true,
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
    },
    status: {
      type: String,
      enum: ["not_started", "in_progress", "completed"],
      default: "not_started",
    },
    rewardClaimed: {
      type: Boolean,
      default: false,
    },
    startedAt: {
      type: Date,
      default: Date.now,
    },
    completedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Tạo chỉ số duy nhất user + mission để tránh lặp
userMissionSchema.index({ userId: 1, missionId: 1 }, { unique: true });

class UserMissionClass {
  /**
   * Lấy danh sách nhiệm vụ hiện tại của user
   */
  static async getMissionsByUser(userId) {
    return this.find({ userId }).populate("missionId").sort({ createdAt: -1 });
  }

  /**
   * Tăng tiến độ nhiệm vụ (nếu chưa hoàn thành)
   */
  async increaseProgress(value = 1) {
    if (this.status === "completed") return this;

    this.progress += value;
    if (this.progress >= this.missionId.target) {
      this.progress = this.missionId.target;
      this.status = "completed";
      this.completedAt = new Date();
    } else if (this.progress > 0) {
      this.status = "in_progress";
    }

    return this.save();
  }

  /**
   * Đánh dấu đã nhận thưởng
   */
  async claimReward() {
    if (!this.rewardClaimed && this.status === "completed") {
      this.rewardClaimed = true;
      await this.save();
      return true;
    }
    return false;
  }
}

userMissionSchema.loadClass(UserMissionClass);

module.exports = mongoose.model("UserMission", userMissionSchema);
