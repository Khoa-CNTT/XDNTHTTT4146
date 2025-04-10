const mongoose = require("mongoose");

const VocabularyGardenLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    plantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VocabularyPlant", // Mỗi log nên liên kết với cây đang được chăm sóc
    },
    seedId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VocabularySeed", // Gợi nhớ user đang dùng seed nào
    },
    action: {
      type: String,
      enum: ["seed", "grow", "water", "harvest", "unlockSeed", "useBooster"],
      required: true,
    },
    word: { type: String }, // Optional: nếu log gắn với từ cụ thể
    message: { type: String }, // Gợi ý thêm để hiển thị trực tiếp ra UI
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "VocabularyGardenLog",
  VocabularyGardenLogSchema
);
