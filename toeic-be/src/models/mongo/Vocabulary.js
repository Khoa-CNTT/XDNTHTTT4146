const mongoose = require("mongoose");

const vocabularySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["topic", "level", "custom"],
      default: "topic",
    },
    words: [
      {
        word: { type: String, required: true },
        meaning: String,
        example: String,
        image: String,
        audio: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("VocabularySet", vocabularySchema);
