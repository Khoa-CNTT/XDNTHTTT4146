const mongoose = require("mongoose");

const VocabularySeedSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    word: { type: String, required: true }, // Từ vựng gốc
    meaning: { type: String, required: true }, // Nghĩa của từ
    status: {
      type: String,
      enum: ["seeded", "growing", "ready_to_harvest"],
      default: "seeded",
    },
    plantedAt: { type: Date, default: Date.now }, // Thời điểm trồng
    harvestTime: { type: Date, required: true }, // Thời điểm có thể thu hoạch
  },
  { timestamps: true }
);

module.exports = mongoose.model("VocabularySeed", VocabularySeedSchema);
