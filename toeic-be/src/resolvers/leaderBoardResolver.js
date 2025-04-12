const LeaderboardService = require("../services/leaderboardService");

const leaderboardResolver = {
  Query: {
    getLeaderboard: async (_, { week, month, limit, offset }) => {
      try {
        return await LeaderboardService.getLeaderboard(
          week,
          month,
          limit,
          offset
        );
      } catch (error) {
        throw new Error(`Không thể lấy leaderboard: ${error.message}`);
      }
    },
  },

  Mutation: {
    updateScore: async (_, { userId, week, month, score }) => {
      try {
        const leaderboard = await LeaderboardService.updateScore(
          userId,
          week,
          month,
          score
        );
        return {
          message: "Điểm đã được cập nhật thành công!",
          leaderboard,
        };
      } catch (error) {
        throw new Error(`Không thể cập nhật điểm: ${error.message}`);
      }
    },
  },
};

module.exports = leaderboardResolver;
