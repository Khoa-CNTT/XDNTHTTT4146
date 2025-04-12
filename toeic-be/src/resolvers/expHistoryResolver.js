const ExpHistoryService = require("../services/expHistoryService");

const ExpHistoryResolver = {
  Query: {
    getUserExpHistory: async (_, { filter }) => {
      return await ExpHistoryService.getUserHistory(filter);
    },
  },
  Mutation: {
    createExpHistory: async (_, { input }) => {
      try {
        const history = await ExpHistoryService.create(input);
        return {
          success: true,
          message: "Ghi nhận điểm kinh nghiệm thành công.",
          history,
        };
      } catch (err) {
        return {
          success: false,
          message: err.message,
          history: null,
        };
      }
    },
  },
};

module.exports = ExpHistoryResolver;
