const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserAchievementSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    achievementId: {
      type: Schema.Types.ObjectId,
      ref: "Achievement",
      required: true,
    },
    unlockedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

UserAchievementSchema.index({ userId: 1, achievementId: 1 }, { unique: true });

module.exports = mongoose.model("UserAchievement", UserAchievementSchema);
