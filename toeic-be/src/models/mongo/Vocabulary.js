const mongoose = require("mongoose");

const VocabularySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Người dùng
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    }, // Cấp độ
    part: { type: Number, enum: [1, 2, 3, 4, 5, 6, 7], required: true }, // Phần của bài thi TOEIC
    word: { type: String, required: true }, // Từ vựng
    meaning: { type: String, required: true }, // Ý nghĩa
    example: { type: String }, // Ví dụ sử dụng từ
    progress: { type: Number, default: 0 }, // Tiến độ học tập cho từ vựng này
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vocabulary", VocabularySchema);
