const mongoose = require("mongoose");
const { Schema } = mongoose;

const userTowerLevelSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    towerLevelId: {
      type: Number,
      required: true,
    },
    score: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["locked", "unlocked", "completed"],
      default: "locked",
    },
    playedAt: {
      type: Date,
    },
    rewardClaimed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: false,
  }
);

userTowerLevelSchema.index({ userId: 1, towerLevelId: 1 }, { unique: true });

module.exports = mongoose.model("UserTowerLevel", userTowerLevelSchema);
