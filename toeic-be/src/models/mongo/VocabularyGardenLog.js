const mongoose = require("mongoose");

const VocabularyGardenLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    action: {
      type: String,
      enum: ["seed", "grow", "harvest"],
      required: true,
    },
    word: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "VocabularyGardenLog",
  VocabularyGardenLogSchema
);
