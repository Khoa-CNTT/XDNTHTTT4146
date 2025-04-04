const mongoose = require("mongoose");

const VocabularySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },
    part: { type: Number, enum: [1, 2, 3, 4, 5, 6, 7], required: true },
    word: { type: String, required: true },
    meaning: { type: String, required: true },
    example: { type: String },
    progress: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vocabulary", VocabularySchema);
