const CoinTransaction = require("../models/mysql/CoinTransaction");
const User = require("../models/mysql/User");
const { v4: uuidv4 } = require("uuid");

/**
 * Hàm xử lý giao dịch xu của người dùng
 * @param {UUID} userId - ID người dùng
 * @param {String} type - Loại giao dịch ("earn" | "spend" | "purchase")
 * @param {Number} amount - Số lượng xu
 * @param {String} description - Mô tả giao dịch
 * @param {UUID} referenceId - ID tham chiếu nếu có
 */
async function createCoinTransaction(
  userId,
  type,
  amount,
  description = "",
  referenceId = null
) {
  const user = await User.findByPk(userId);
  if (!user) throw new Error("Người dùng không tồn tại!");

  // Kiểm tra nếu người dùng tiêu xu mà không đủ
  if (type === "spend" && user.coins < amount) {
    throw new Error("Không đủ xu để thực hiện giao dịch!");
  }

  // Cập nhật số xu của người dùng
  if (type === "earn" || type === "purchase") {
    user.coins += amount;
  } else if (type === "spend") {
    user.coins -= amount;
  }
  await user.save();

  // Lưu giao dịch vào bảng CoinTransaction
  await CoinTransaction.create({
    id: uuidv4(),
    userId,
    type,
    amount,
    description,
    referenceId,
  });

  return { success: true, message: "Giao dịch thành công!" };
}

module.exports = { createCoinTransaction };
