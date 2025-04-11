const { v4: uuidv4 } = require("uuid");
const { sequelize } = require("../models/mysql");
const CoinTransaction = require("../models/mysql/CoinTransaction");
const User = require("../models/mysql/User");

// Enum loại giao dịch xu
const CoinTransactionType = {
  EARN: "earn", // Nhận xu từ nhiệm vụ, phần thưởng
  SPEND: "spend", // Tiêu xu khi mua vật phẩm, chơi game
  PURCHASE: "purchase", // Mua xu qua thanh toán
};
Object.freeze(CoinTransactionType);

// Custom Error để dễ bắt trong resolver
class TransactionError extends Error {
  constructor(message, code = "TRANSACTION_ERROR") {
    super(message);
    this.name = "TransactionError";
    this.code = code;
  }
}

/**
 * Tạo giao dịch xu (earn/spend/purchase)
 * @param {UUID} userId
 * @param {"earn"|"spend"|"purchase"} type
 * @param {number} amount
 * @param {string} [description]
 * @param {UUID|null} [referenceId]
 * @param {string|null} [source] - Nguồn gốc: "mission", "shop", "event", etc.
 */
async function createCoinTransaction(
  userId,
  type,
  amount,
  description = "",
  referenceId = null,
  source = null
) {
  const t = await sequelize.transaction();

  try {
    const user = await User.findByPk(userId, { transaction: t });
    if (!user)
      throw new TransactionError("Người dùng không tồn tại!", "USER_NOT_FOUND");

    if (!Object.values(CoinTransactionType).includes(type)) {
      throw new TransactionError(
        "Loại giao dịch không hợp lệ!",
        "INVALID_TYPE"
      );
    }

    if (type === CoinTransactionType.SPEND && user.coins < amount) {
      throw new TransactionError(
        "Không đủ xu để thực hiện giao dịch!",
        "INSUFFICIENT_COINS"
      );
    }

    // Cập nhật xu
    if (
      type === CoinTransactionType.EARN ||
      type === CoinTransactionType.PURCHASE
    ) {
      user.coins += amount;
    } else if (type === CoinTransactionType.SPEND) {
      user.coins -= amount;
    }

    await user.save({ transaction: t });

    const transaction = await CoinTransaction.create(
      {
        id: uuidv4(),
        userId,
        type,
        amount,
        description,
        referenceId,
        source,
      },
      { transaction: t }
    );

    await t.commit();

    return {
      success: true,
      message: "Giao dịch thành công!",
      balance: user.coins,
      transaction,
    };
  } catch (error) {
    await t.rollback();
    throw error;
  }
}

/**
 * Lấy số dư xu của người dùng
 * @param {UUID} userId
 * @returns {Promise<number>}
 */
async function getUserBalance(userId) {
  const user = await User.findByPk(userId, { attributes: ["id", "coins"] });
  if (!user)
    throw new TransactionError("Người dùng không tồn tại!", "USER_NOT_FOUND");
  return user.coins;
}

/**
 * Lấy lịch sử giao dịch xu
 * @param {UUID} userId
 * @param {number} [limit=20]
 * @param {string|null} [type]
 * @returns {Promise<CoinTransaction[]>}
 */
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
