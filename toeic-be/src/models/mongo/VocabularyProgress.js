const mongoose = require("mongoose");
const { Schema } = mongoose;
const vocabularyProgressSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    vocabularyId: {
      type: Schema.Types.ObjectId,
      ref: "Vocabulary",
      required: true,
    },
    learned: {
      type: String,
      enum: ["NOT_LEARNED", "LEARNING", "LEARNED"],
      default: "NOT_LEARNED",
    },
    studyCount: { type: Number, default: 0 },
    lastStudiedAt: { type: Date },
  },
  { timestamps: true }
);

const VocabularyProgress = mongoose.model(
  "VocabularyProgress",
  vocabularyProgressSchema
);

module.exports = VocabularyProgress;
