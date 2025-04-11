const mongoose = require("mongoose");
const { Schema } = mongoose;

const GameSessionSchema = new Schema(
  {
    gameId: {
      type: Schema.Types.ObjectId,
      ref: "Game",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    score: {
      type: Number,
      default: 0,
    },
    duration: {
      type: Number,
      default: 0,
    },
    completedAt: {
      type: Date,
      default: Date.now,
    },
    metadata: {
      type: Schema.Types.Mixed, // lưu các thông tin linh hoạt: câu sai, câu đúng, lựa chọn,...
      default: {},
    },
    status: {
      type: String,
      enum: ["in-progress", "completed", "abandoned"],
      default: "in-progress",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Thêm chỉ mục vào các trường quan trọng để tối ưu hóa truy vấn
GameSessionSchema.index({ userId: 1 });
GameSessionSchema.index({ gameId: 1 });
GameSessionSchema.index({ status: 1 });

module.exports = mongoose.model("GameSession", GameSessionSchema);
