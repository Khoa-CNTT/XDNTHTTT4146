const Leaderboard = require("../models/mongo/LeaderBoard");

class LeaderboardService {
  // Tạo hoặc cập nhật điểm người dùng theo type & timeframe
  static async upsertScore({ userId, type, timeFrame, recordedAt, score }) {
    try {
      const filter = {
        userId,
        type,
        timeFrame,
        recordedAt: this.getTimeFrameKey(timeFrame, recordedAt),
      };

      const update = { score };
      const options = { new: true, upsert: true };

      const leaderboard = await Leaderboard.findOneAndUpdate(
        filter,
        update,
        options
      );

      return leaderboard;
    } catch (error) {
      throw new Error("Không thể cập nhật điểm người dùng.");
    }
  }

  // Lấy leaderboard theo type, timeframe
  static async getLeaderboard({
    type,
    timeFrame,
    recordedAt,
    limit = 10,
    offset = 0,
  }) {
    try {
      const filter = {
        type,
        timeFrame,
        recordedAt: this.getTimeFrameKey(timeFrame, recordedAt),
      };

      return await Leaderboard.find(filter)
        .sort({ score: -1 })
        .skip(offset)
        .limit(limit);
    } catch (error) {
      throw new Error("Không thể lấy leaderboard.");
    }
  }

  // Chuẩn hóa thời gian theo từng khung thời gian
  static getTimeFrameKey(timeFrame, date = new Date()) {
    const d = new Date(date);
    switch (timeFrame) {
      case "DAILY":
        return new Date(d.getFullYear(), d.getMonth(), d.getDate());
      case "WEEKLY":
        const day = d.getDay(); // 0 (Sun) to 6 (Sat)
        const diff = d.getDate() - day + (day === 0 ? -6 : 1); // về thứ 2
        return new Date(d.setDate(diff));
      case "MONTHLY":
        return new Date(d.getFullYear(), d.getMonth(), 1);
      default:
        throw new Error("Timeframe không hợp lệ.");
    }
  }
}

module.exports = LeaderboardService;
