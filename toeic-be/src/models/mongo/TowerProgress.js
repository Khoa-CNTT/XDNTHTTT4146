const mongoose = require("mongoose");
const { Schema } = mongoose;

const TowerProgressSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    towerId: {
      type: Schema.Types.ObjectId,
      ref: "Tower",
      required: true,
    },
    isUnlocked: {
      type: Boolean,
      default: false,
    },
    unlockedAt: {
      type: Date,
      default: null,
    },
    completedLessons: [
      {
        type: Schema.Types.ObjectId,
        ref: "Lesson",
      },
    ],
    completedGames: [
      {
        type: Schema.Types.ObjectId,
        ref: "GameSession",
      },
    ],
    progressPercent: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
  },
  {
    timestamps: true,
  }
);

// Tạo chỉ mục cho userId, towerId và progressPercent
TowerProgressSchema.index({ userId: 1, towerId: 1 });
TowerProgressSchema.index({ progressPercent: 1 });

module.exports = mongoose.model("TowerProgress", TowerProgressSchema);
