const mongoose = require("mongoose");

const VocabularySeedSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    packageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VocabularyPackage",
    }, // optional

    status: {
      type: String,
      enum: ["seeded", "growing", "ready_to_harvest", "harvested", "expired"],
      default: "seeded",
    },

    words: [
      {
        word: { type: String, required: true },
        meaning: { type: String, required: true },
        hint: String,
        isLearned: { type: Boolean, default: false },
        learnedAt: Date,
      },
    ],

    plantedAt: Date,
    harvestTime: Date,
    harvestedAt: Date,
    isExpired: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("VocabularySeed", VocabularySeedSchema);
