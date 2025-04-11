const { Question, MockTest } = require("../../models/mysql");

const questionResolver = {
  Query: {
    async getMockQuestionsByTest(_, { mock_test_id }) {
      return await Question.findAll({
        where: { mock_test_id, is_active: true },
        order: [["createdAt", "ASC"]],
        include: [{ model: MockTest, as: "mockTest" }],
      });
    },

    async getMockQuestionById(_, { id }) {
      return await Question.findByPk(id, {
        include: [{ model: MockTest, as: "mockTest" }],
      });
    },
  },

  Mutation: {
    async createMockQuestion(_, { input }) {
      try {
        const question = await Question.create(input);
        return {
          success: true,
          message: "Câu hỏi đã được tạo thành công!",
          question,
        };
      } catch (error) {
        console.error("Error creating question:", error);
        return {
          success: false,
          message: "Không thể tạo câu hỏi.",
          question: null,
        };
      }
    },

    async updateMockQuestion(_, { id, input }) {
      try {
        const question = await Question.findByPk(id);
        if (!question) {
          return {
            success: false,
            message: "Câu hỏi không tồn tại.",
            question: null,
          };
        }

        await question.update(input);
        return {
          success: true,
          message: "Cập nhật câu hỏi thành công.",
          question,
        };
      } catch (error) {
        console.error("Error updating question:", error);
        return {
          success: false,
          message: "Không thể cập nhật câu hỏi.",
          question: null,
        };
      }
    },

    async deleteMockQuestion(_, { id }) {
      try {
        const question = await Question.findByPk(id);
        if (!question) return false;

        await question.destroy();
        return true;
      } catch (error) {
        console.error("Error deleting question:", error);
        return false;
      }
    },
  },

  MockQuestion: {
    async mockTest(parent) {
      return await MockTest.findByPk(parent.mock_test_id);
    },
  },
};

module.exports = questionResolver;
