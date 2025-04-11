module.exports = {
  Query: {
    // Lấy tất cả giao dịch (admin hoặc dùng cho thống kê)
    getAllCoinTransactions: async (_, __, { models }) => {
      return await models.CoinTransaction.findAll({
        order: [["createdAt", "DESC"]],
        include: [{ model: models.User, as: "user" }],
      });
    },

    // Lấy chi tiết 1 giao dịch theo ID
    getCoinTransactionById: async (_, { id }, { models }) => {
      return await models.CoinTransaction.findByPk(id, {
        include: [{ model: models.User, as: "user" }],
      });
    },

    // Lấy các giao dịch của 1 user
    getCoinTransactionsByUser: async (_, { userId }, { models }) => {
      return await models.CoinTransaction.findAll({
        where: { userId },
        order: [["createdAt", "DESC"]],
      });
    },
  },

  Mutation: {
    // Tạo giao dịch xu mới
    createCoinTransaction: async (_, { input }, { models }) => {
      try {
        const { userId, type, amount, note, sourceType, sourceId } = input;

        const user = await models.User.findByPk(userId);
        if (!user) throw new Error("Không tìm thấy người dùng");

        if (type === "earn") {
          user.coin += amount;
        } else if (type === "spend") {
          if (user.coin < amount) {
            throw new Error("Không đủ xu để thực hiện giao dịch");
          }
          user.coin -= amount;
        } else {
          throw new Error("Loại giao dịch không hợp lệ (earn/spend)");
        }

        await user.save();

        const transaction = await models.CoinTransaction.create({
          userId,
          type,
          amount,
          note,
          sourceType,
          sourceId,
        });

        return transaction;
      } catch (error) {
        throw new Error("Lỗi khi tạo giao dịch: " + error.message);
      }
    },
  },

  CoinTransaction: {
    // Format lại datetime nếu bạn có Scalar DateTime bên schema
    createdAt: (parent) => parent.createdAt?.toISOString(),
    updatedAt: (parent) => parent.updatedAt?.toISOString(),

    // Gán user nếu có quan hệ include
    user: async (parent, _, { models }) => {
      if (parent.user) return parent.user;
      return await models.User.findByPk(parent.userId);
    },
  },
};
