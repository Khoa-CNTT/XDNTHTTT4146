const { v4: uuidv4 } = require("uuid");
const { sequelize } = require("../models");
const { CoinTransaction, User } = require("../models");

const CoinTransactionType = {
  EARN: "earn",
  SPEND: "spend",
  PURCHASE: "purchase",
};
Object.freeze(CoinTransactionType);

class TransactionError extends Error {
  constructor(message, code = "TRANSACTION_ERROR") {
    super(message);
    this.name = "TransactionError";
    this.code = code;
  }
}

async function createCoinTransaction(input) {
  const {
    userId,
    type,
    amount,
    description = "",
    referenceId = null,
    metadata = {},
  } = input;

  const t = await sequelize.transaction();

  try {
    // Kiểm tra người dùng có tồn tại không
    const user = await User.findByPk(userId, { transaction: t });
    if (!user)
      throw new TransactionError("Người dùng không tồn tại", "USER_NOT_FOUND");

    // Kiểm tra loại giao dịch
    if (!isValidTransactionType(type)) {
      throw new TransactionError("Loại giao dịch không hợp lệ", "INVALID_TYPE");
    }

    // Kiểm tra đủ xu khi giao dịch loại "spend"
    if (type === CoinTransactionType.SPEND && user.coins < amount) {
      throw new TransactionError("Không đủ xu", "INSUFFICIENT_COINS");
    }

    // Cập nhật xu của người dùng
    if (
      type === CoinTransactionType.EARN ||
      type === CoinTransactionType.PURCHASE
    ) {
      user.coins += amount;
    } else if (type === CoinTransactionType.SPEND) {
      user.coins -= amount;
    }

    await user.save({ transaction: t });

    // Ghi lại giao dịch
    const transaction = await CoinTransaction.create(
      {
        id: uuidv4(),
        userId,
        type,
        amount,
        description,
        referenceId,
        metadata,
      },
      { transaction: t }
    );

    await t.commit();

    return {
      success: true,
      message: "Giao dịch thành công",
      balance: user.coins,
      transaction,
    };
  } catch (error) {
    await t.rollback();
    throw error;
  }
}

async function getUserBalance(userId) {
  const user = await User.findByPk(userId);
  if (!user) throw new TransactionError("Người dùng không tồn tại");
  return user.coins;
}

async function getUserTransactions(userId, limit = 20, type = null) {
  const where = { userId };
  if (type) where.type = type;

  return await CoinTransaction.findAll({
    where,
    order: [["createdAt", "DESC"]],
    limit,
  });
}

module.exports = {
  createCoinTransaction,
  getUserBalance,
  getUserTransactions,
  CoinTransactionType,
  TransactionError,
};
