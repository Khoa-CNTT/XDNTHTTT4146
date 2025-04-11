const mongoose = require("mongoose");

const VocabularyGardenLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    progressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VocabularyProgress", // Cập nhật tên mới của cây đã trồng
    },

    seedId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VocabularySeed",
    },

    action: {
      type: String,
      enum: ["seed", "grow", "water", "harvest", "unlockSeed", "useBooster"],
      required: true,
    },

    word: { type: String },
    message: { type: String },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true, collection: "vocabulary_garden_logs" }
);

module.exports = mongoose.model(
  "VocabularyGardenLog",
  VocabularyGardenLogSchema
);
