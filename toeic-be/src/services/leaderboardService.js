const Leaderboard = require("../models/mysql/Leaderboard");
const User = require("../models/mysql/User");
const LeaderboardHistory = require("../models/mongo/LeaderboardHistory");

/**
 * Snapshot bảng xếp hạng vào MongoDB (50 người top)
 * Gọi hàm này theo lịch định kỳ (cron job)
 */
async function saveLeaderboardHistory() {
  const snapshotAt = new Date();

  try {
    // Lấy top 50 người chơi có EXP cao nhất
    const topPlayers = await Leaderboard.findAll({
      order: [["totalExp", "DESC"]],
      limit: 50,
      include: [
        {
          model: User,
          attributes: ["id", "fullName", "email"],
        },
      ],
    });

    if (topPlayers.length === 0) {
      console.warn(
        `[${snapshotAt.toISOString()}] ⚠️ Không có dữ liệu leaderboard để lưu.`
      );
      return;
    }

    // Chuẩn bị dữ liệu để insert vào MongoDB
    const historyRecords = topPlayers.map((player, index) => ({
      userId: player.userId,
      totalExp: player.totalExp,
      rank: index + 1,
      snapshotAt,
      userName: player.User?.fullName || "Unknown",
      email: player.User?.email || "",
    }));

    // Lưu vào MongoDB
    await LeaderboardHistory.insertMany(historyRecords);

    console.log(
      `✅ [${snapshotAt.toISOString()}] Đã lưu ${
        historyRecords.length
      } người top leaderboard vào MongoDB.`
    );
  } catch (error) {
    console.error(
      "❌ Lỗi khi lưu lịch sử leaderboard:",
      error.message || error
    );
    // Có thể log lỗi vào hệ thống cảnh báo (Sentry, Slack, mail dev, ...)
  }
}

module.exports = {
  saveLeaderboardHistory,
};
