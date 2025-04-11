const mongoose = require("mongoose");
const moment = require("moment");

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
      min: 0,
    },
    rank: {
      type: Number,
      required: true,
      min: 1,
    },
    date: {
      type: Date,
      required: true,
    },
    type: {
      type: String,
      enum: ["exp", "garden", "tower", "event"],
      default: "exp",
      index: true,
    },
    week: { type: String },
    month: { type: String },
  },
  { timestamps: true }
);

leaderboardHistorySchema.index({ date: 1 });
leaderboardHistorySchema.index({ userId: 1, date: -1 });
leaderboardHistorySchema.index({ totalExp: -1, date: -1 });
leaderboardHistorySchema.index({ rank: 1, date: 1 });
leaderboardHistorySchema.index(
  { userId: 1, date: 1, type: 1 },
  { unique: true }
);

class LeaderboardHistoryClass {
  static async getTopPlayersByDate(
    date = new Date(),
    type = "exp",
    limit = 10
  ) {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(end.getDate() + 1);

    return this.find({ type, date: { $gte: start, $lt: end } })
      .sort({ rank: 1 })
      .limit(limit)
      .populate("userId", "fullName avatarUrl")
      .lean();
  }

  static async recordHistory({
    userId,
    totalExp,
    rank,
    type = "exp",
    date = new Date(),
  }) {
    const cleanDate = new Date(date);
    cleanDate.setHours(0, 0, 0, 0);
    const week = moment(cleanDate).format("GGGG-[W]WW");
    const month = moment(cleanDate).format("YYYY-MM");

    return this.findOneAndUpdate(
      { userId, date: cleanDate, type },
      { userId, totalExp, rank, date: cleanDate, week, month, type },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  }

  static async getUserHistory(userId, type = "exp") {
    return this.find({ userId, type }).sort({ date: -1 }).lean();
  }

  static async getUserRankByDate(userId, date = new Date(), type = "exp") {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(end.getDate() + 1);

    return this.findOne({
      userId,
      type,
      date: { $gte: start, $lt: end },
    }).lean();
  }
}

leaderboardHistorySchema.loadClass(LeaderboardHistoryClass);

module.exports = mongoose.model("LeaderboardHistory", leaderboardHistorySchema);
