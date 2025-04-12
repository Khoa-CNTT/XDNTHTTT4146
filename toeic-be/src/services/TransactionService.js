const { Transaction, Item, User } = require("../models");
const { sequelize } = require("../config/mysql");

class TransactionService {
  // Mua item
  static async buyItem(userId, itemId, quantity) {
    const transaction = await sequelize.transaction();

    try {
      // Kiểm tra sự tồn tại của item
      const item = await Item.findByPk(itemId, { transaction });
      if (!item || item.status !== "active") {
        throw new Error("Item không tồn tại hoặc không hoạt động.");
      }

      // Kiểm tra người dùng
      const user = await User.findByPk(userId, { transaction });
      if (!user) throw new Error("Người dùng không tồn tại.");

      // Tính tổng giá trị của giao dịch
      const totalPrice = parseFloat(item.price) * quantity;

      // Kiểm tra người dùng có đủ coin để mua item không
      if (user.coin < totalPrice) {
        throw new Error("Không đủ coin để mua item.");
      }

      // Trừ coin của người dùng
      await User.update(
        { coin: user.coin - totalPrice },
        { where: { id: userId }, transaction }
      );

      // Tạo giao dịch
      const transactionRecord = await Transaction.create(
        {
          userId,
          itemId,
          number: quantity,
          totalPrice,
          status: "COMPLETED",
          paymentStatus: "PAID",
        },
        { transaction }
      );

      // Commit giao dịch
      await transaction.commit();

      return {
        message: "Đã mua item thành công",
        transaction: transactionRecord,
      };
    } catch (error) {
      // Rollback nếu có lỗi
      await transaction.rollback();
      throw error;
    }
  }
}

module.exports = TransactionService;
