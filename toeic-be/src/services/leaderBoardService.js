const Leaderboard = require("../models/Leaderboard");

class LeaderboardService {
  // Cập nhật điểm học từ vựng cho một người dùng trong tuần/tháng
  static async updateScore(userId, week, month, score) {
    try {
      // Kiểm tra xem người dùng đã có điểm trong tuần/tháng này chưa
      let leaderboard = await Leaderboard.findOne({ userId, week, month });

      if (leaderboard) {
        // Cập nhật điểm nếu đã tồn tại
        leaderboard.score = score;
        await leaderboard.save();
      } else {
        // Nếu chưa có, tạo mới
        leaderboard = new Leaderboard({
          userId,
          week,
          month,
          score,
        });
        await leaderboard.save();
      }

      return leaderboard;
    } catch (error) {
      throw new Error("Không thể cập nhật điểm cho người dùng.");
    }
  }

  // Lấy leaderboard theo tuần/tháng
  static async getLeaderboard(week, month, limit = 10, offset = 0) {
    try {
      const leaderboard = await Leaderboard.find({ week, month })
        .limit(limit)
        .skip(offset)
        .sort({ score: -1 }); // Sắp xếp theo điểm cao nhất

      return leaderboard;
    } catch (error) {
      throw new Error("Không thể lấy leaderboard.");
    }
  }
}

module.exports = LeaderboardService;
