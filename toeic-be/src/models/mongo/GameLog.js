const mongoose = require("mongoose");

const gameLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    gameId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Game",
      required: true,
    },
    score: { type: Number, default: 0 }, // Điểm số đạt được
    duration: { type: Number, default: 0 }, // Thời gian chơi (giây)
    status: {
      type: String,
      enum: ["win", "lose", "draw"],
      required: true,
    },
    expEarned: { type: Number, default: 0 }, // EXP kiếm được từ game
    coinsEarned: { type: Number, default: 0 }, // Xu thưởng
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

class GameLogClass {
  static async getUserGameLogs(userId) {
    return this.find({ userId }).populate("gameId");
  }

  static async getGameLogsByGame(gameId) {
    return this.find({ gameId }).populate("userId");
  }
}

gameLogSchema.loadClass(GameLogClass);
const GameLog = mongoose.model("GameLog", gameLogSchema);
module.exports = GameLog;
