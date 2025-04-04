const mongoose = require("mongoose");

const VocabularySeedSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    word: { type: String, required: true },
    meaning: { type: String, required: true },
    status: {
      type: String,
      enum: ["seeded", "growing", "ready_to_harvest"],
      default: "seeded",
    },
    plantedAt: { type: Date, default: Date.now },
    harvestTime: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("VocabularySeed", VocabularySeedSchema);
