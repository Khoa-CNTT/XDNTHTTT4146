const mongoose = require("mongoose");

class LeaderboardClass {
  static async getTopPlayers(limit = 10) {
    return this.find().sort({ total_exp: -1 }).limit(limit);
  }
}

const LeaderboardSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    total_exp: { type: Number, required: true },
    rank: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

LeaderboardSchema.loadClass(LeaderboardClass);

module.exports = mongoose.model("Leaderboard", LeaderboardSchema);
