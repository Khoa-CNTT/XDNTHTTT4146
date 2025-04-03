const Leaderboard = require("../models/mysql/Leaderboard");
const LeaderboardHistory = require("../models/mongodb/LeaderboardHistory");

async function saveLeaderboardHistory() {
  try {
    const topPlayers = await Leaderboard.findAll({
      order: [["total_exp", "DESC"]],
      limit: 50,
    });

    const historyRecords = topPlayers.map((player) => ({
      userId: player.user_id,
      total_exp: player.total_exp,
      rank: player.rank,
      date: new Date(),
    }));

    await LeaderboardHistory.insertMany(historyRecords);
    console.log("Đã lưu lịch sử leaderboard vào MongoDB!");
  } catch (error) {
    console.error("Lỗi khi lưu lịch sử leaderboard:", error);
  }
}
