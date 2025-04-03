const mongoose = require("mongoose");

const VocabularyGardenSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    gardenId: { type: mongoose.Schema.Types.ObjectId, ref: "Garden" },
    seedId: { type: mongoose.Schema.Types.ObjectId, ref: "Seed" },
    vocabulary: [
      {
        word: { type: String, required: true },
        meaning: { type: String, required: true },
        example: { type: String },
        status: {
          type: String,
          enum: ["planted", "growing", "harvested"],
          default: "planted",
        },
      },
    ],
    progress: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("VocabularyGarden", VocabularyGardenSchema);
