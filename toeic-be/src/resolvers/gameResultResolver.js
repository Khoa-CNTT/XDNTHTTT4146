const {
  AuthenticationError,
  UserInputError,
} = require("apollo-server-express");
const GameResultService = require("../../services/GameResultService");

const gameResultResolver = {
  Query: {
    getGameResultsByUser: async (_, { userId }) => {
      return await GameResultService.getByUser(userId);
    },
    getGameResult: async (_, { id }) => {
      const result = await GameResultService.getById(id);
      if (!result) throw new UserInputError("Không tìm thấy kết quả.");
      return result;
    },
  },

  Mutation: {
    submitGameResult: async (_, { input }, { user }) => {
      if (!user) throw new AuthenticationError("Bạn cần đăng nhập.");

      try {
        const gameResult = await GameResultService.submit(user.id, input);
        return {
          success: true,
          message: "Gửi kết quả thành công!",
          gameResult,
        };
      } catch (error) {
        return {
          success: false,
          message: "Lỗi gửi kết quả: " + error.message,
          gameResult: null,
        };
      }
    },
  },
};

module.exports = gameResultResolver;
