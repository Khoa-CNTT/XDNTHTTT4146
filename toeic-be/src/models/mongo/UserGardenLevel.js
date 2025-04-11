const mongoose = require("mongoose");

const userGardenLevelSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    gardenLevelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GardenLevel",
      required: true,
    },
    exp: {
      type: Number,
      default: 0,
      min: 0,
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
    unlockedAt: {
      type: Date,
    },
    completedAt: {
      type: Date,
    },
    isUnlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Thêm chỉ mục cho các trường quan trọng
userGardenLevelSchema.index({ userId: 1, gardenLevelId: 1 });
userGardenLevelSchema.index({ progress: 1 });

module.exports = mongoose.model("UserGardenLevel", userGardenLevelSchema);
