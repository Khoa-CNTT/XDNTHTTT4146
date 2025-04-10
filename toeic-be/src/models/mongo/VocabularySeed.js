const mongoose = require("mongoose");

const VocabularySeedSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Từ vựng được gói trong hạt giống
    word: { type: String, required: true },
    meaning: { type: String, required: true },

    // Gắn vào gói học (nếu có), ví dụ: hạt giống của bộ 10 từ
    packageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VocabularyPackage",
    },

    // Trạng thái của hạt
    status: {
      type: String,
      enum: ["seeded", "growing", "ready_to_harvest", "planted", "expired"],
      default: "seeded",
    },

    // Mốc thời gian
    plantedAt: { type: Date }, // Lúc gieo xuống đất
    harvestTime: { type: Date, required: true }, // Khi đủ điều kiện thu hoạch
    harvestedAt: { type: Date }, // Đã thu hoạch hay chưa
    isExpired: { type: Boolean, default: false }, // Hạt quá hạn chưa được chăm
  },
  { timestamps: true }
);
