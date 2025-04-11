const ExpHistory = require("../../models/mysql/ExpHistory");

const expHistoryResolver = {
  Query: {
    getExpHistoriesByUser: async (_, { userId }) => {
      try {
        return await ExpHistory.findAll({
          where: { userId },
          order: [["createdAt", "DESC"]],
        });
      } catch (err) {
        console.error("Error fetching exp histories:", err);
        throw new Error("Không thể lấy lịch sử kinh nghiệm.");
      }
    },

    getExpHistoryById: async (_, { id }) => {
      try {
        const history = await ExpHistory.findByPk(id);
        if (!history) throw new Error("Không tìm thấy lịch sử kinh nghiệm.");
        return history;
      } catch (err) {
        console.error("Error fetching exp history by ID:", err);
        throw new Error("Đã xảy ra lỗi khi truy vấn.");
      }
    },
  },

  Mutation: {
    createExpHistory: async (_, { input }) => {
      try {
        const newLog = await ExpHistory.create(input);
        return {
          success: true,
          message: "Ghi nhận kinh nghiệm thành công!",
          expHistory: newLog,
        };
      } catch (err) {
        console.error("Error creating exp history:", err);
        return {
          success: false,
          message: "Không thể ghi nhận kinh nghiệm.",
          expHistory: null,
        };
      }
    },
  },
};

module.exports = expHistoryResolver;
