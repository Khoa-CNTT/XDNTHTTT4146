const { Payment, Course, User, Enrollment } = require("../models/mysql");
const { GraphQLError } = require("graphql");

// Tạo giao dịch thanh toán mới
const createPayment = async (input) => {
  try {
    const { userId, courseId, amount } = input;

    // Kiểm tra thông tin hợp lệ
    const [user, course] = await Promise.all([
      User.findByPk(userId),
      Course.findByPk(courseId),
    ]);

    if (!user || !course) {
      throw new GraphQLError("Thông tin người dùng hoặc khóa học không hợp lệ");
    }

    // Tạo thanh toán
    const payment = await Payment.create(input);
    return payment;
  } catch (error) {
    throw new GraphQLError(error.message || "Không thể tạo thanh toán");
  }
};

// Cập nhật trạng thái thanh toán (pending → completed/failed)
const updatePaymentStatus = async (id, status) => {
  try {
    const [affectedRows] = await Payment.update({ status }, { where: { id } });

    if (affectedRows === 0) {
      throw new GraphQLError("Không tìm thấy thanh toán để cập nhật");
    }

    const payment = await Payment.findByPk(id);

    // Nếu thanh toán thành công → ghi danh + các xử lý khác
    if (status === "completed" && payment.courseId) {
      await Enrollment.findOrCreate({
        where: {
          userId: payment.userId,
          courseId: payment.courseId,
        },
      });
    }

    return payment;
  } catch (error) {
    throw new GraphQLError(
      error.message || "Cập nhật trạng thái thanh toán thất bại"
    );
  }
};

// Lấy chi tiết thanh toán theo ID
const getPaymentById = async (id) => {
  try {
    const payment = await Payment.findByPk(id, {
      include: [Course, User],
    });

    if (!payment) {
      throw new GraphQLError("Không tìm thấy thanh toán");
    }

    return payment;
  } catch (error) {
    throw new GraphQLError(error.message || "Lỗi khi lấy thông tin thanh toán");
  }
};

// Lấy thông tin thanh toán theo transactionId (cho callback VNPAY/MOMO)
const getPaymentByTransactionId = async (transactionId) => {
  try {
    const payment = await Payment.findOne({
      where: { transactionId },
      include: [Course, User],
    });

    if (!payment) {
      throw new GraphQLError("Không tìm thấy giao dịch theo transactionId");
    }

    return payment;
  } catch (error) {
    throw new GraphQLError("Lỗi khi truy vấn thanh toán theo transactionId");
  }
};

// Lấy danh sách thanh toán của người dùng
const getPaymentsByUser = async (userId) => {
  try {
    const payments = await Payment.findAll({
      where: { userId },
      include: [Course],
      order: [["createdAt", "DESC"]],
    });

    return payments;
  } catch (error) {
    throw new GraphQLError("Không thể lấy lịch sử thanh toán của người dùng");
  }
};

// Dành cho Admin: lấy tất cả giao dịch
const getAllPayments = async () => {
  try {
    const payments = await Payment.findAll({
      include: [User, Course],
      order: [["createdAt", "DESC"]],
    });

    return payments;
  } catch (error) {
    throw new GraphQLError("Không thể lấy danh sách thanh toán");
  }
};

// Xoá mềm thanh toán
const softDeletePayment = async (id) => {
  try {
    const payment = await Payment.findByPk(id);
    if (!payment) {
      throw new GraphQLError("Không tìm thấy thanh toán để xoá");
    }

    await payment.destroy();
    return true;
  } catch (error) {
    throw new GraphQLError("Xoá thanh toán thất bại");
  }
};

module.exports = {
  createPayment,
  updatePaymentStatus,
  getPaymentById,
  getPaymentByTransactionId,
  getPaymentsByUser,
  getAllPayments,
  softDeletePayment,
};
