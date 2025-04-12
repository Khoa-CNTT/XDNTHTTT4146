const MasteryRoadService = require("../services/masteryRoadService");

const masteryRoadResolvers = {
  Query: {
    // Lấy tất cả mastery roads của course
    getMasteryRoads: async (_, { courseId }) => {
      try {
        return await MasteryRoadService.getMasteryRoads(courseId);
      } catch (error) {
        throw new Error(error.message);
      }
    },

    // Lấy MasteryRoad theo ID
    getMasteryRoad: async (_, { id }) => {
      try {
        return await MasteryRoadService.getMasteryRoadById(id);
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },

  Mutation: {
    // Tạo MasteryRoad mới
    createMasteryRoad: async (
      _,
      {
        name,
        description,
        courseId,
        towerId,
        gardenId,
        difficultyLevel,
        status,
      }
    ) => {
      try {
        return await MasteryRoadService.createMasteryRoad({
          name,
          description,
          courseId,
          towerId,
          gardenId,
          difficultyLevel,
          status,
        });
      } catch (error) {
        throw new Error(error.message);
      }
    },

    // Cập nhật MasteryRoad
    updateMasteryRoad: async (
      _,
      {
        id,
        name,
        description,
        courseId,
        towerId,
        gardenId,
        difficultyLevel,
        status,
      }
    ) => {
      try {
        return await MasteryRoadService.updateMasteryRoad({
          id,
          name,
          description,
          courseId,
          towerId,
          gardenId,
          difficultyLevel,
          status,
        });
      } catch (error) {
        throw new Error(error.message);
      }
    },

    // Xóa MasteryRoad
    deleteMasteryRoad: async (_, { id }) => {
      try {
        return await MasteryRoadService.deleteMasteryRoad(id);
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};

module.exports = masteryRoadResolvers;
