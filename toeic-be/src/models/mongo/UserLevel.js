const mongoose = require("mongoose");

const userLevelSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    levelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Level",
      required: true,
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
    isUnlocked: {
      type: Boolean,
      default: false,
    },
    unlockedAt: {
      type: Date,
    },
    completedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

class UserLevelClass {
  //Lấy danh sách tầng (level) theo user kèm thông tin level chi tiết
  static async findByUser(userId) {
    return this.find({ userId }).populate("levelId");
  }

  //Đánh dấu hoàn thành level hiện tại và mở khóa tầng tiếp theo
  async completeLevel() {
    this.completed = true;
    this.progress = 100;
    this.completedAt = new Date();
    await this.save();

    // Mở khóa tầng tiếp theo (nếu có)
    const currentLevel = await mongoose.model("Level").findById(this.levelId);
    const nextLevel = await mongoose
      .model("Level")
      .findOne({ targetScore: { $gt: currentLevel.targetScore } })
      .sort({ targetScore: 1 });

    if (nextLevel) {
      const exists = await mongoose.model("UserLevel").findOne({
        userId: this.userId,
        levelId: nextLevel._id,
      });

      if (!exists) {
        await mongoose.model("UserLevel").create({
          userId: this.userId,
          levelId: nextLevel._id,
          isUnlocked: true,
          unlockedAt: new Date(),
        });
      }
    }

    return this;
  }

  //Cập nhật tiến độ level (0 - 100), tự đánh dấu completed nếu đủ
  async updateProgress(newProgress) {
    this.progress = Math.min(newProgress, 100);
    if (this.progress >= 100 && !this.completed) {
      return this.completeLevel();
    }
    return this.save();
  }
}

userLevelSchema.loadClass(UserLevelClass);

const UserLevel = mongoose.model("UserLevel", userLevelSchema);
module.exports = UserLevel;
