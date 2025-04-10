const { v4: uuidv4 } = require("uuid");
const CoinTransaction = require("../models/mysql/CoinTransaction");
const User = require("../models/mysql/User");

// Enum loại giao dịch xu
const CoinTransactionType = {
  EARN: "earn", // Nhận xu (nhiệm vụ, thành tích, sự kiện)
  SPEND: "spend", // Tiêu xu (mua vật phẩm, nâng cấp, chơi game)
  PURCHASE: "purchase", // Mua xu qua thanh toán
};
Object.freeze(CoinTransactionType);

// Custom Error để dễ bắt lỗi trong GraphQL
class TransactionError extends Error {
  constructor(message, code = "TRANSACTION_ERROR") {
    super(message);
    this.name = "TransactionError";
    this.code = code;
  }
}

/**
 * Tạo giao dịch xu cho người dùng
 * @param {UUID} userId - ID người dùng
 * @param {"earn" | "spend" | "purchase"} type - Loại giao dịch
 * @param {number} amount - Số lượng xu
 * @param {string} [description] - Mô tả giao dịch
 * @param {UUID|null} [referenceId] - ID tham chiếu (nhiệm vụ, đơn hàng, vật phẩm,...)
 * @returns {Promise<{success: boolean, balance: number, transaction: object}>}
 */
async function createCoinTransaction(
  userId,
  type,
  amount,
  description = "",
  referenceId = null
) {
  const user = await User.findByPk(userId);
  if (!user)
    throw new TransactionError("Người dùng không tồn tại!", "USER_NOT_FOUND");

  if (!Object.values(CoinTransactionType).includes(type)) {
    throw new TransactionError("Loại giao dịch không hợp lệ!", "INVALID_TYPE");
  }

  if (type === CoinTransactionType.SPEND && user.coins < amount) {
    throw new TransactionError(
      "Không đủ xu để thực hiện giao dịch!",
      "INSUFFICIENT_COINS"
    );
  }

  // Cập nhật số xu
  switch (type) {
    case CoinTransactionType.EARN:
    case CoinTransactionType.PURCHASE:
      user.coins += amount;
      break;
    case CoinTransactionType.SPEND:
      user.coins -= amount;
      break;
  }
  await user.save();

  // Ghi lịch sử giao dịch
  const transaction = await CoinTransaction.create({
    id: uuidv4(),
    userId,
    type,
    amount,
    description,
    referenceId,
  });

  return {
    success: true,
    message: "Giao dịch thành công!",
    balance: user.coins,
    transaction,
  };
}

/**
 * Lấy số dư xu hiện tại của người dùng
 * @param {UUID} userId
 * @returns {Promise<number>}
 */
async function getUserBalance(userId) {
  const user = await User.findByPk(userId, {
    attributes: ["id", "coins"],
  });
  if (!user)
    throw new TransactionError("Người dùng không tồn tại!", "USER_NOT_FOUND");
  return user.coins;
}

module.exports = {
  createCoinTransaction,
  getUserBalance,
  CoinTransactionType,
  TransactionError,
};
