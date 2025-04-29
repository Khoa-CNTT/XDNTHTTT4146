const MiniGameService = require("../services/miniGameService");

const miniGameResolvers = {
  Query: {
    // Lấy tất cả MiniGames
    getAllMiniGames: async () => {
      try {
        return await MiniGameService.getAllMiniGames();
      } catch (error) {
        throw new Error(error.message);
      }
    },
    // Lấy MiniGame theo ID
    getMiniGame: async (_, { id }) => {
      try {
        return await MiniGameService.getMiniGameById(id);
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },

  Mutation: {
    // Tạo MiniGame mới
    createMiniGame: async (_, { name, description }) => {
      try {
        return await MiniGameService.createMiniGame({ name, description });
      } catch (error) {
        throw new Error(error.message);
      }
    },
    // Cập nhật MiniGame
    updateMiniGame: async (_, { id, name, description }) => {
      try {
        return await MiniGameService.updateMiniGame(id, { name, description });
      } catch (error) {
        throw new Error(error.message);
      }
    },
    // Xóa MiniGame
    deleteMiniGame: async (_, { id }) => {
      try {
        return await MiniGameService.deleteMiniGame(id);
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};

module.exports = miniGameResolvers;
