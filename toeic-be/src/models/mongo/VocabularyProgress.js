const mongoose = require("mongoose");

const VocabularyProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    seedId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VocabularySeed",
      required: true,
    },

    word: { type: String, required: true },
    meaning: { type: String, required: true },

    level: { type: Number, default: 1 },
    growthStage: {
      type: String,
      enum: ["seedling", "sprout", "bloom", "fruit", "harvested"],
      default: "seedling",
    },

    expEarned: { type: Number, default: 10 },
    wateredAt: { type: Date },
    harvestedAt: { type: Date },
    isWithered: { type: Boolean, default: false },

    streak: { type: Number, default: 0 },
    lastReviewedAt: { type: Date },
    notes: { type: String },
  },
  {
    timestamps: true,
    collection: "vocabulary_progress",
  }
);

module.exports = mongoose.model("VocabularyProgress", VocabularyProgressSchema);
