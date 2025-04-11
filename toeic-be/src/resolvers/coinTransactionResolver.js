module.exports = {
  Query: {
    // Lấy tất cả giao dịch
    getAllCoinTransactions: async (_, __, { models }) => {
      return models.CoinTransaction.findAll({ order: [["createdAt", "DESC"]] });
    },

    // Lấy chi tiết giao dịch theo ID
    getCoinTransactionById: async (_, { id }, { models }) => {
      return models.CoinTransaction.findByPk(id);
    },

    // Lấy giao dịch theo user
    getCoinTransactionsByUser: async (_, { userId }, { models }) => {
      return models.CoinTransaction.findAll({
        where: { userId },
        order: [["createdAt", "DESC"]],
      });
    },
  },

  Mutation: {
    // Tạo giao dịch xu mới
    createCoinTransaction: async (_, { input }, { models }) => {
      try {
        const { userId, type, amount } = input;

        // Kiểm tra User tồn tại
        const user = await models.User.findByPk(userId);
        if (!user) throw new Error("Không tìm thấy người dùng");

        // Cập nhật xu người dùng nếu type là "earn" hoặc "spend"
        if (type === "earn") {
          user.coin += amount;
        } else if (type === "spend") {
          if (user.coin < amount) {
            throw new Error("Không đủ xu để thực hiện giao dịch");
          }
          user.coin -= amount;
        }
        await user.save();

        // Tạo giao dịch
        const transaction = await models.CoinTransaction.create(input);
        return transaction;
      } catch (error) {
        throw new Error("Lỗi khi tạo giao dịch: " + error.message);
      }
    },
  },

  // Optional: có thể thêm format ngày nếu bạn dùng scalar DateTime sau này
  CoinTransaction: {
    createdAt: (parent) => parent.createdAt.toISOString(),
    updatedAt: (parent) => parent.updatedAt.toISOString(),
  },
};
