const MockTest = require("../../models/mysql/MockTest");

const mockTestService = {
  // Lấy tất cả Mock Tests với bộ lọc
  getAllMockTests: async (filter) => {
    const where = {};

    if (filter) {
      const { difficulty, is_active, is_public, created_by, keyword } = filter;

      if (difficulty) where.difficulty = difficulty;
      if (is_active !== undefined) where.is_active = is_active;
      if (is_public !== undefined) where.is_public = is_public;
      if (created_by) where.created_by = created_by;
      if (keyword) {
        where.title = { [Op.like]: `%${keyword}%` };
      }
    }

    try {
      return await MockTest.findAll({ where, order: [["createdAt", "DESC"]] });
    } catch (error) {
      throw new Error(`Error fetching mock tests: ${error.message}`);
    }
  },

  // Lấy Mock Test theo ID
  getMockTestById: async (id) => {
    try {
      const mockTest = await MockTest.findByPk(id);
      if (!mockTest) {
        throw new Error("Mock test not found");
      }
      return mockTest;
    } catch (error) {
      throw new Error(`Error fetching mock test: ${error.message}`);
    }
  },

  // Lấy tất cả Mock Tests theo người tạo
  getMockTestsByCreator: async (creatorId) => {
    try {
      return await MockTest.findAll({
        where: { created_by: creatorId },
        order: [["createdAt", "DESC"]],
      });
    } catch (error) {
      throw new Error(`Error fetching mock tests by creator: ${error.message}`);
    }
  },

  // Tạo mới Mock Test
  createMockTest: async (input) => {
    try {
      return await MockTest.create(input);
    } catch (error) {
      throw new Error(`Error creating mock test: ${error.message}`);
    }
  },

  // Cập nhật Mock Test
  updateMockTest: async (id, input) => {
    try {
      const mockTest = await MockTest.findByPk(id);
      if (!mockTest) {
        throw new Error("Mock test not found");
      }

      await mockTest.update(input);
      return mockTest;
    } catch (error) {
      throw new Error(`Error updating mock test: ${error.message}`);
    }
  },

  // Xóa Mock Test
  deleteMockTest: async (id) => {
    try {
      const mockTest = await MockTest.findByPk(id);
      if (!mockTest) {
        throw new Error("Mock test not found");
      }

      await mockTest.destroy();
      return mockTest;
    } catch (error) {
      throw new Error(`Error deleting mock test: ${error.message}`);
    }
  },
};

module.exports = mockTestService;
