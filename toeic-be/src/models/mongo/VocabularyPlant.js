const mongoose = require("mongoose");

const VocabularyPlantSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    word: { type: String, required: true },
    meaning: { type: String, required: true },
    level: { type: Number, default: 1 },
    expEarned: { type: Number, default: 10 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("VocabularyPlant", VocabularyPlantSchema);
