const mongoose = require("mongoose");

const leaderboardSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    totalExp: {
      type: Number,
      required: true,
      default: 0,
    },

    rank: {
      type: Number,
      required: true,
      min: 1,
    },

    type: {
      type: String,
      enum: ["daily", "weekly", "monthly", "event"],
      required: true,
      default: "daily",
    },

    scope: {
      type: String,
      enum: ["global", "tower", "garden", "event"],
      default: "global",
    },

    scopeId: {
      type: mongoose.Schema.Types.ObjectId,
      required: function () {
        return this.scope !== "global";
      },
      refPath: "scopeModel",
    },

    scopeModel: {
      type: String,
      required: function () {
        return this.scope !== "global";
      },
      enum: ["TowerLevel", "Event"],
    },

    period: {
      type: String,
      required: true,
      comment:
        "Chuỗi dạng ISO cho biết mốc thời gian, ví dụ: 2025-04-10 / 2025-W15 / 2025-04",
    },
  },
  {
    timestamps: true,
  }
);
