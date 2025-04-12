const levelService = require("../../services/mysql/level.service");

const levelResolver = {
  Query: {
    // Truy vấn Level theo ID
    getLevelById: async (_, { id }) => {
      return await levelService.getLevelById(id);
    },

    // Truy vấn tất cả các Level
    getAllLevels: async () => {
      return await levelService.getAllLevels();
    },

    // Truy vấn Level theo targetScore
    getLevelByTargetScore: async (_, { targetScore }) => {
      return await levelService.getLevelByTargetScore(targetScore);
    },
  },

  Mutation: {
    // Tạo mới Level
    createLevel: async (_, { input }) => {
      const level = await levelService.createLevel(input);
      return {
        success: true,
        message: "Level được tạo thành công",
        level,
      };
    },

    // Cập nhật Level
    updateLevel: async (_, { id, input }) => {
      const level = await levelService.updateLevel(id, input);
      return {
        success: true,
        message: "Level được cập nhật thành công",
        level,
      };
    },

    // Xoá Level
    deleteLevel: async (_, { id }) => {
      const success = await levelService.deleteLevel(id);
      return {
        success,
        message: success ? "Level đã bị xoá" : "Không tìm thấy level để xoá",
      };
    },

    // Phục hồi Level đã xoá mềm
    restoreLevel: async (_, { id }) => {
      const level = await levelService.restoreLevel(id);
      return {
        success: true,
        message: "Level đã được phục hồi",
        level,
      };
    },
  },
};

module.exports = levelResolver;
