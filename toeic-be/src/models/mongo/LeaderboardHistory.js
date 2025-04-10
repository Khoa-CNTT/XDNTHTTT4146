const mongoose = require("mongoose");

const leaderboardHistorySchema = new mongoose.Schema(
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
      required: true,
    },
  },
  { timestamps: true }
);

// 🔍 Index hỗ trợ truy vấn theo ngày và xếp hạng
leaderboardHistorySchema.index({ date: 1 });
leaderboardHistorySchema.index({ totalExp: -1 });

class LeaderboardHistoryClass {
  /**
   * Truy vấn top người chơi theo một ngày cụ thể
   * @param {Date} date
   * @param {Number} limit
   */
  static async getTopPlayersByDate(date = new Date(), limit = 10) {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(start);
    end.setDate(end.getDate() + 1);

    return this.find({
      date: { $gte: start, $lt: end },
    })
      .sort({ totalExp: -1 })
      .limit(limit)
      .populate("userId");
  }

  /**
   * Lưu lịch sử bảng xếp hạng theo ngày
   * @param {Object} param0
   */
  static async recordHistory({ userId, totalExp, rank, date = new Date() }) {
    const cleanDate = new Date(date);
    cleanDate.setHours(0, 0, 0, 0);

    return this.create({
      userId,
      totalExp,
      rank,
      date: cleanDate,
    });
  }

  static async getUserHistory(userId) {
    return this.find({ userId }).sort({ date: -1 });
  }
}

leaderboardHistorySchema.loadClass(LeaderboardHistoryClass);

const LeaderboardHistory = mongoose.model(
  "LeaderboardHistory",
  leaderboardHistorySchema
);
module.exports = LeaderboardHistory;
