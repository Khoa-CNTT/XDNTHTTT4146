const mockTestService = require("../../services/mockTestService");

const mockTestResolver = {
  Query: {
    // Lấy tất cả Mock Tests với bộ lọc
    getAllMockTests: async (_, { filter }) => {
      try {
        const mockTests = await mockTestService.getAllMockTests(filter);
        return mockTests;
      } catch (error) {
        throw new Error(`Error fetching mock tests: ${error.message}`);
      }
    },

    // Lấy Mock Test theo ID
    getMockTestById: async (_, { id }) => {
      try {
        return await mockTestService.getMockTestById(id);
      } catch (error) {
        throw new Error(`Error fetching mock test: ${error.message}`);
      }
    },

    // Lấy tất cả Mock Tests theo người tạo
    getMockTestsByCreator: async (_, { creatorId }) => {
      try {
        return await mockTestService.getMockTestsByCreator(creatorId);
      } catch (error) {
        throw new Error(
          `Error fetching mock tests by creator: ${error.message}`
        );
      }
    },
  },

  Mutation: {
    // Tạo mới Mock Test
    createMockTest: async (_, { input }) => {
      try {
        const mockTest = await mockTestService.createMockTest(input);
        return {
          status: true,
          msg: "Mock test created successfully",
          mockTest,
        };
      } catch (error) {
        return {
          status: false,
          msg: `Error creating mock test: ${error.message}`,
          mockTest: null,
        };
      }
    },

    // Cập nhật Mock Test
    updateMockTest: async (_, { id, input }) => {
      try {
        const mockTest = await mockTestService.updateMockTest(id, input);
        return {
          status: true,
          msg: "Mock test updated successfully",
          mockTest,
        };
      } catch (error) {
        return {
          status: false,
          msg: `Error updating mock test: ${error.message}`,
          mockTest: null,
        };
      }
    },

    // Xóa Mock Test
    deleteMockTest: async (_, { id }) => {
      try {
        const mockTest = await mockTestService.deleteMockTest(id);
        return {
          status: true,
          msg: "Mock test deleted successfully",
          mockTest,
        };
      } catch (error) {
        return {
          status: false,
          msg: `Error deleting mock test: ${error.message}`,
          mockTest: null,
        };
      }
    },
  },
};

module.exports = { resolvers: mockTestResolver };
