const AnswerService = require("../services/answerService");

const answerResolvers = {
  Query: {
    // Lấy Answer theo ID
    getAnswer: async (_, { id }) => {
      try {
        return await AnswerService.getAnswerById(id);
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },

  Mutation: {
    // Tạo một Answer mới
    createAnswer: async (
      _,
      { label, answer, questionId, isCorrect, explanation, order }
    ) => {
      try {
        return await AnswerService.createAnswer({
          label,
          answer,
          questionId,
          isCorrect,
          explanation,
          order,
        });
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};

module.exports = answerResolvers;
