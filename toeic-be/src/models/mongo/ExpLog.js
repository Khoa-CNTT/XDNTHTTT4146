const mongoose = require("mongoose");

const ExpLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    exp: {
      type: Number,
      required: true,
      min: 0,
    },

    source: {
      type: String,
      enum: [
        "lesson",
        "quiz",
        "game",
        "mission",
        "event",
        "vocabulary",
        "challenge",
        "booster",
        "correction",
        "refund",
        "rollback",
      ],
      required: true,
    },

    refId: {
      type: String,
      required: false,
      comment: "ID tham chiếu đến bài học, kết quả game, mission,...",
    },

    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
      comment: "Tuỳ ý: từ vựng, booster, device info,...",
    },

    message: {
      type: String,
      required: false,
      comment: "Thông điệp dễ hiểu cho người dùng hoặc admin",
    },

    isBonus: {
      type: Boolean,
      default: false,
      comment: "EXP được cộng thêm do event, booster, phần thưởng đặc biệt",
    },

    isReverted: {
      type: Boolean,
      default: false,
      comment: "EXP đã bị huỷ do rollback / cheat detection",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ExpLog", ExpLogSchema);
