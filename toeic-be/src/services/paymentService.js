const { Payment, Invoice, Course, User } = require("../models");
const { v4: uuidv4 } = require("uuid");
const { sequelize } = require("../models");

class PaymentService {
  // Nạp coin
  static async topUp(userId, amount, method = "VNPAY") {
    const coinAmount = Math.floor(amount); // Ví dụ: 1 VNĐ = 1 coin
    const transaction = await sequelize.transaction();

    try {
      // Tạo payment record cho nạp coin
      const payment = await Payment.create(
        {
          userId,
          amount,
          coin: coinAmount,
          type: "TOP_UP",
          status: "SUCCESS", // Hoặc PENDING nếu có cổng thanh toán
          method,
        },
        { transaction }
      );

      // Cộng coin vào tài khoản
      await User.increment(
        { coin: coinAmount },
        { where: { id: userId }, transaction }
      );

      // Commit transaction
      await transaction.commit();

      return payment;
    } catch (error) {
      // Rollback nếu có lỗi
      await transaction.rollback();
      throw error;
    }
  }

  // Mua khóa học
  static async buyCourse(userId, courseId, method = "COIN") {
    const transaction = await sequelize.transaction();

    try {
      const course = await Course.findByPk(courseId, { transaction });
      if (!course || course.status !== "active") {
        throw new Error("Khóa học không tồn tại hoặc không hoạt động.");
      }

      const user = await User.findByPk(userId, { transaction });
      if (!user) throw new Error("Người dùng không tồn tại.");

      const price = parseFloat(course.price);

      if (method === "COIN") {
        if (user.coin < price) {
          throw new Error("Không đủ coin để mua khóa học.");
        }

        // Trừ coin
        await User.update(
          { coin: user.coin - price },
          { where: { id: userId }, transaction }
        );

        // Tạo payment record
        const payment = await Payment.create(
          {
            userId,
            amount: price,
            type: "BUY_COURSE",
            status: "SUCCESS",
            refId: courseId,
            refModel: "Course",
            method,
          },
          { transaction }
        );

        // Tạo hóa đơn
        await Invoice.create(
          {
            invoiceCode: `INV-${uuidv4()}`,
            userId,
            courseId,
            paymentId: payment.id,
            price,
            status: "PAID",
          },
          { transaction }
        );

        // Commit transaction
        await transaction.commit();

        return { message: "Đã mua khóa học thành công", payment };
      }

      throw new Error("Phương thức thanh toán không hợp lệ.");
    } catch (error) {
      // Rollback transaction nếu có lỗi
      await transaction.rollback();
      throw error;
    }
  }
}

module.exports = PaymentService;
