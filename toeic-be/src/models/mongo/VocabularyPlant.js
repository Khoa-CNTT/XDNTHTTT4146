const mongoose = require("mongoose");

const VocabularyPlantSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    seedId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VocabularySeed", // Liên kết với seed đã trồng ra cây này
      required: true,
    },
    word: { type: String, required: true },
    meaning: { type: String, required: true },

    level: { type: Number, default: 1 }, // Cấp độ cây (phát triển theo thời gian)
    growthStage: {
      type: String,
      enum: ["seedling", "sprout", "bloom", "fruit", "harvested"],
      default: "seedling",
    },
    expEarned: { type: Number, default: 10 },

    wateredAt: { type: Date }, // Lần tưới gần nhất
    harvestedAt: { type: Date }, // Đã thu hoạch chưa

    isWithered: { type: Boolean, default: false }, // Cây bị héo nếu bỏ quá lâu
  },
  { timestamps: true }
);

module.exports = mongoose.model("VocabularyPlant", VocabularyPlantSchema);
