const { MockResult, MockTest, User } = require("../../models/mysql");
const { Op, fn, col, literal, where } = require("sequelize");

const mockResultResolver = {
  Query: {
    async getMockResultsByUser(_, { userId }) {
      return await MockResult.findAll({
        where: { user_id: userId },
        order: [["submitted_at", "DESC"]],
      });
    },

    async getMockResultById(_, { id }) {
      return await MockResult.findByPk(id);
    },

    async getWeeklyMockStatsByUser(_, { userId }) {
      // Dùng Sequelize với hàm WEEK/ISO_WEEK và YEAR để lấy thống kê theo tuần
      const results = await MockResult.findAll({
        attributes: [
          [fn("YEAR", col("submitted_at")), "year"],
          [fn("WEEK", col("submitted_at"), 1), "week"], // 1 = ISO week
          [fn("AVG", col("score")), "avgScore"],
          [fn("COUNT", col("id")), "attempts"],
        ],
        where: {
          user_id: userId,
          status: "completed",
        },
        group: [
          fn("YEAR", col("submitted_at")),
          fn("WEEK", col("submitted_at"), 1),
        ],
        order: [
          [fn("YEAR", col("submitted_at")), "DESC"],
          [fn("WEEK", col("submitted_at"), 1), "DESC"],
        ],
        raw: true,
      });

      return results.map((item) => ({
        year: parseInt(item.year),
        week: parseInt(item.week),
        avgScore: parseFloat(item.avgScore),
        attempts: parseInt(item.attempts),
      }));
    },
  },

  Mutation: {
    async createMockResult(_, { input }) {
      try {
        const newResult = await MockResult.create(input);
        return {
          status: true,
          msg: "Mock result created successfully",
          mockResult: newResult,
        };
      } catch (error) {
        console.error("Create Error:", error);
        return {
          status: false,
          msg: "Failed to create mock result",
          mockResult: null,
        };
      }
    },

    async updateMockResult(_, { id, input }) {
      try {
        const result = await MockResult.findByPk(id);
        if (!result) {
          return {
            status: false,
            msg: "Mock result not found",
            mockResult: null,
          };
        }
        await result.update(input);
        return {
          status: true,
          msg: "Mock result updated successfully",
          mockResult: result,
        };
      } catch (error) {
        console.error("Update Error:", error);
        return {
          status: false,
          msg: "Failed to update mock result",
          mockResult: null,
        };
      }
    },

    async deleteMockResult(_, { id }) {
      try {
        const result = await MockResult.findByPk(id);
        if (!result) {
          return {
            status: false,
            msg: "Mock result not found",
            mockResult: null,
          };
        }
        await result.destroy();
        return {
          status: true,
          msg: "Mock result deleted successfully",
          mockResult: result,
        };
      } catch (error) {
        console.error("Delete Error:", error);
        return {
          status: false,
          msg: "Failed to delete mock result",
          mockResult: null,
        };
      }
    },
  },
};

module.exports = mockResultResolver;
