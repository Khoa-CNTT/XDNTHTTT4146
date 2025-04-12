const mockResultService = require("../../services/mockResultService");

const mockResultResolver = {
  Query: {
    // Lấy tất cả các MockResults
    getAllMockResults: async () => {
      return await mockResultService.getAllMockResults();
    },

    // Lấy MockResult theo ID
    getMockResultById: async (_, { id }) => {
      return await mockResultService.getMockResultById(id);
    },

    // Lấy các MockResult của một User
    getMockResultsByUser: async (_, { userId }) => {
      return await mockResultService.getMockResultsByUser(userId);
    },
  },

  Mutation: {
    // Tạo mới MockResult
    createMockResult: async (_, { input }) => {
      const result = await mockResultService.createMockResult(input);
      return result;
    },

    // Cập nhật MockResult
    updateMockResult: async (_, { id, input }) => {
      const result = await mockResultService.updateMockResult(id, input);
      return result;
    },

    // Xoá MockResult
    deleteMockResult: async (_, { id }) => {
      const success = await mockResultService.deleteMockResult(id);
      return success;
    },
  },
};

module.exports = mockResultResolver;
