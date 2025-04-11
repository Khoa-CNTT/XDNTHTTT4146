const { GraphQLDateTime } = require("graphql-iso-date");

module.exports = {
  Query: {
    // Top người chơi theo ngày và loại bảng xếp hạng
    getTopPlayersByDate: async (
      _,
      { date, type = "exp", limit = 10 },
      { models }
    ) => {
      return await models.LeaderboardHistory.getTopPlayersByDate(
        date,
        type,
        limit
      );
    },

    // Lịch sử rank của một người chơi
    getUserLeaderboardHistory: async (
      _,
      { userId, type = "exp" },
      { models }
    ) => {
      return await models.LeaderboardHistory.getUserHistory(userId, type);
    },

    // Rank cụ thể của người dùng tại một ngày
    getUserRankByDate: async (
      _,
      { userId, date, type = "exp" },
      { models }
    ) => {
      return await models.LeaderboardHistory.getUserRankByDate(
        userId,
        date,
        type
      );
    },
  },

  Mutation: {
    // Ghi hoặc cập nhật lịch sử bảng xếp hạng
    recordLeaderboardHistory: async (_, { input }, { models }) => {
      return await models.LeaderboardHistory.recordHistory(input);
    },
  },

  LeaderboardHistory: {
    // Lấy thông tin user
    user: async (parent, _, { models }) => {
      return (await models.User.findByPk?.(parent.userId)) || null;
    },

    date: (parent) => parent.date.toISOString(),
    createdAt: (parent) => parent.createdAt?.toISOString(),
    updatedAt: (parent) => parent.updatedAt?.toISOString(),
  },

  // Optional: Nếu bạn đang dùng scalar date
  DateTime: GraphQLDateTime,
};
