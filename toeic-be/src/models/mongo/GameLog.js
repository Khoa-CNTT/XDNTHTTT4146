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
    score: {
      type: Number,
      default: 0,
    },
    duration: {
      type: Number,
      default: 0, // Giây
    },
    status: {
      type: String,
      enum: ["win", "lose", "draw"],
      required: true,
    },
    expEarned: {
      type: Number,
      default: 0,
    },
    coinsEarned: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

gameLogSchema.index({ userId: 1 });
gameLogSchema.index({ gameId: 1 });

class GameLogClass {
  static async getUserGameLogs(
    userId,
    { startDate, endDate, limit = 10, page = 1 } = {}
  ) {
    const query = { userId };
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    return this.find(query)
      .populate("gameId")
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit);
  }

  static async getGameLogsByGame(gameId, { limit = 10, page = 1 } = {}) {
    return this.find({ gameId })
      .populate("userId")
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit);
  }
}

gameLogSchema.loadClass(GameLogClass);

const GameLog = mongoose.model("GameLog", gameLogSchema);
module.exports = GameLog;
