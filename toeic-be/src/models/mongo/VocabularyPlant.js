const mongoose = require("mongoose");

const VocabularyPlantSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    word: { type: String, required: true }, // Từ vựng gốc
    meaning: { type: String, required: true }, // Nghĩa
    level: { type: Number, default: 1 }, // Level cây từ vựng
    expEarned: { type: Number, default: 10 }, // Kinh nghiệm nhận được khi thu hoạch
  },
  { timestamps: true }
);

module.exports = mongoose.model("VocabularyPlant", VocabularyPlantSchema);
