const missionService = require("../services/missionService");

const missionResolver = {
  Query: {
    // Lấy tất cả các missions
    getAllMissions: async () => {
      return await missionService.getAllMissions();
    },

    // Lấy mission theo ID
    getMissionById: async (_, { id }) => {
      return await missionService.getMissionById(id);
    },

    // Lấy các mission còn đang hoạt động
    getActiveMissions: async () => {
      return await missionService.getActiveMissions();
    },
  },

  Mutation: {
    // Tạo mission mới
    createMission: async (_, { input }) => {
      const mission = await missionService.createMission(input);
      return {
        success: true,
        message: "Mission được tạo thành công",
        mission,
      };
    },

    // Cập nhật mission
    updateMission: async (_, { id, input }) => {
      const mission = await missionService.updateMission(id, input);
      return {
        success: true,
        message: "Mission được cập nhật thành công",
        mission,
      };
    },

    // Xoá mission
    deleteMission: async (_, { id }) => {
      const success = await missionService.deleteMission(id);
      return {
        success,
        message: success
          ? "Mission đã bị xoá"
          : "Không tìm thấy mission để xoá",
      };
    },
  },
};

module.exports = missionResolver;
