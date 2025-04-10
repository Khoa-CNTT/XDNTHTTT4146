const mongoose = require("mongoose");

const userMissionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    missionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DailyMission",
      required: true,
    },
    progress: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["not_started", "in_progress", "completed"],
      default: "not_started",
    },
    rewardClaimed: { type: Boolean, default: false },
    startedAt: { type: Date, default: Date.now },
    completedAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserMission", userMissionSchema);
