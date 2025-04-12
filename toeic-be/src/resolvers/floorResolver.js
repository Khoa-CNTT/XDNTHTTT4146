const FloorService = require("../services/floorService");

const floorResolvers = {
  Query: {
    // Lấy tất cả Floors của một Tower
    getAllFloors: async (_, { towerId }) => {
      try {
        return await FloorService.getAllFloorsByTowerId(towerId);
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },

  Mutation: {
    // Tạo Floor mới
    createFloor: async (_, { towerId, floor, miniGameId, toeicScore }) => {
      try {
        return await FloorService.createFloor({
          towerId,
          floor,
          miniGameId,
          toeicScore,
        });
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};

module.exports = floorResolvers;
