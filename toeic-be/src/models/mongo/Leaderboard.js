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
    },
    rank: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return today;
      },
    },
  },
  {
    timestamps: true,
  }
);

leaderboardSchema.index({ date: 1 });
leaderboardSchema.index({ totalExp: -1 });

class LeaderboardClass {
  /**
   * Lấy top người chơi trong 1 ngày cụ thể
   * @param {Date} date
   * @param {number} limit
   */
  static async getTopPlayers({ date = new Date(), limit = 10 } = {}) {
    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);

    const dayEnd = new Date(dayStart);
    dayEnd.setDate(dayEnd.getDate() + 1);

    return this.find({
      date: { $gte: dayStart, $lt: dayEnd },
    })
      .sort({ totalExp: -1 })
      .limit(limit)
      .populate("userId");
  }

  static async upsertLeaderboard({
    userId,
    totalExp,
    rank,
    date = new Date(),
  }) {
    const cleanDate = new Date(date);
    cleanDate.setHours(0, 0, 0, 0);

    return this.findOneAndUpdate(
      { userId, date: cleanDate },
      { totalExp, rank },
      { upsert: true, new: true }
    );
  }
}

leaderboardSchema.loadClass(LeaderboardClass);

const Leaderboard = mongoose.model("Leaderboard", leaderboardSchema);
module.exports = Leaderboard;
