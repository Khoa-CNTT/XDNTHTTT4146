const { Op } = require("sequelize");
const MockTest = require("../../models/mysql/MockTest");

const mockTestResolver = {
  Query: {
    getAllMockTests: async (_, { filter }) => {
      const where = {};

      if (filter) {
        const { difficulty, is_active, is_public, created_by, keyword } =
          filter;

        if (difficulty) where.difficulty = difficulty;
        if (is_active !== undefined) where.is_active = is_active;
        if (is_public !== undefined) where.is_public = is_public;
        if (created_by) where.created_by = created_by;
        if (keyword) {
          where.title = { [Op.like]: `%${keyword}%` };
        }
      }

      return await MockTest.findAll({ where, order: [["createdAt", "DESC"]] });
    },

    getMockTestById: async (_, { id }) => {
      return await MockTest.findByPk(id);
    },

    getMockTestsByCreator: async (_, { creatorId }) => {
      return await MockTest.findAll({
        where: { created_by: creatorId },
        order: [["createdAt", "DESC"]],
      });
    },
  },

  Mutation: {
    createMockTest: async (_, { input }) => {
      try {
        const mockTest = await MockTest.create(input);
        return {
          status: true,
          msg: "Mock test created successfully",
          mockTest,
        };
      } catch (error) {
        return {
          status: false,
          msg: error.message,
          mockTest: null,
        };
      }
    },

    updateMockTest: async (_, { id, input }) => {
      try {
        const mockTest = await MockTest.findByPk(id);
        if (!mockTest)
          return {
            status: false,
            msg: "Mock test not found",
            mockTest: null,
          };

        await mockTest.update(input);
        return {
          status: true,
          msg: "Mock test updated successfully",
          mockTest,
        };
      } catch (error) {
        return {
          status: false,
          msg: error.message,
          mockTest: null,
        };
      }
    },

    deleteMockTest: async (_, { id }) => {
      try {
        const mockTest = await MockTest.findByPk(id);
        if (!mockTest)
          return {
            status: false,
            msg: "Mock test not found",
            mockTest: null,
          };

        await mockTest.destroy();
        return {
          status: true,
          msg: "Mock test deleted successfully",
          mockTest,
        };
      } catch (error) {
        return {
          status: false,
          msg: error.message,
          mockTest: null,
        };
      }
    },
  },
};

module.exports = { resolvers: mockTestResolver };
