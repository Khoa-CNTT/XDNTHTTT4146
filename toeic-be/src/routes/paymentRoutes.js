const express = require("express");
const PaymentService = require("../services/paymentService");
const router = express.Router();

// Route để nạp coin
router.post("/top-up", async (req, res) => {
  const { amount, method } = req.body;
  const { user } = req;

  if (!user) {
    return res.status(401).json({ message: "Authentication required." });
  }

  try {
    const payment = await PaymentService.topUp(user.id, amount, method);
    res.json({ message: "Nạp coin thành công", payment });
  } catch (error) {
    console.error("Error in top-up:", error);
    res
      .status(500)
      .json({ message: "Có lỗi xảy ra khi nạp coin", error: error.message });
  }
});

// Route để mua khóa học
router.post("/buy-course", async (req, res) => {
  const { courseId, method = "COIN" } = req.body;
  const { user } = req;

  if (!user) {
    return res.status(401).json({ message: "Authentication required." });
  }

  try {
    const paymentResponse = await PaymentService.buyCourse(
      user.id,
      courseId,
      method
    );
    res.json(paymentResponse);
  } catch (error) {
    console.error("Error in buy-course:", error);
    res
      .status(500)
      .json({
        message: "Có lỗi xảy ra khi mua khóa học",
        error: error.message,
      });
  }
});

// Route để nhận callback từ VNPay/MoMo
router.post("/payment-callback", async (req, res) => {
  const { transactionId, status, method, userId, courseId } = req.body;

  try {
    // Xử lý callback để cập nhật trạng thái thanh toán
    const payment = await PaymentService.handlePaymentCallback(
      transactionId,
      status,
      method,
      userId,
      courseId
    );

    res.json({ message: "Thanh toán đã được cập nhật", payment });
  } catch (error) {
    console.error("Error in payment callback:", error);
    res
      .status(500)
      .json({
        message: "Có lỗi xảy ra khi xử lý callback",
        error: error.message,
      });
  }
});

module.exports = router;
