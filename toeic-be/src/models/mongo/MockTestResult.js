const mongoose = require("mongoose");

class MockTestResultClass {
  calculateScore() {
    return this.correct_answers * 5;
  }
}

const MockTestResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  mockTestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MockTest",
    required: true,
  },
  total_questions: { type: Number, required: true },
  correct_answers: { type: Number, required: true, default: 0 },
  wrong_answers: { type: Number, required: true, default: 0 },
  score: { type: Number, default: 0 }, // Điểm số tổng cộng
  completion_time: { type: Number, required: true }, // Thời gian hoàn thành bài thi (phút)
  createdAt: { type: Date, default: Date.now },
});

// Áp dụng class method
MockTestResultSchema.loadClass(MockTestResultClass);

module.exports = mongoose.model("MockTestResult", MockTestResultSchema);
