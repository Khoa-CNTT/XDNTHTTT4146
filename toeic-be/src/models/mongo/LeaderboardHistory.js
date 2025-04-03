const mongoose = require("mongoose");

class LeaderboardHistoryClass {
  static async getTopPlayersByDate(date, limit = 10) {
    return this.find({ date }).sort({ total_exp: -1 }).limit(limit);
  }
}

const LeaderboardHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    total_exp: { type: Number, required: true },
    rank: { type: Number, required: true },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

LeaderboardHistorySchema.loadClass(LeaderboardHistoryClass);

module.exports = mongoose.model("LeaderboardHistory", LeaderboardHistorySchema);
