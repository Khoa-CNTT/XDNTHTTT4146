const {
  createCoinTransaction,
  getUserBalance,
  getUserTransactions,
  TransactionError,
} = require("../services/coinTransactionService");

const CoinTransactionResolver = {
  Query: {
    getAllCoinTransactions: async (_, __, { models }) => {
      return await models.CoinTransaction.findAll({
        include: [{ model: models.User, as: "user" }],
        order: [["createdAt", "DESC"]],
      });
    },
    getCoinTransactionById: async (_, { id }, { models }) => {
      return await models.CoinTransaction.findByPk(id, {
        include: [{ model: models.User, as: "user" }],
      });
    },
    getCoinTransactionsByUser: async (_, { userId, type, limit }, __) => {
      return await getUserTransactions(userId, limit, type);
    },
    getUserCoinBalance: async (_, { userId }) => {
      return await getUserBalance(userId);
    },
  },

  Mutation: {
    createCoinTransaction: async (_, { input }) => {
      try {
        return await createCoinTransaction(input);
      } catch (err) {
        if (err instanceof TransactionError) {
          return {
            success: false,
            message: err.message,
            balance: null,
            transaction: null,
          };
        }
        throw err;
      }
    },
  },

  CoinTransaction: {
    createdAt: (parent) => parent.createdAt?.toISOString(),
    updatedAt: (parent) => parent.updatedAt?.toISOString(),
    user: async (parent, _, { models }) => {
      if (parent.user) return parent.user;
      return await models.User.findByPk(parent.userId);
    },
  },
};

module.exports = CoinTransactionResolver;
