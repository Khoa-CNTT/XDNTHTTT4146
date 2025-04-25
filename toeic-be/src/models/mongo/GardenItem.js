const mongoose = require("mongoose");
const { Schema } = mongoose;

const gardenItemSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    shopItemId: {
      type: Schema.Types.ObjectId,
      ref: "ShopItem",
      required: true,
    },
    isUsed: {
      type: Boolean,
      default: false,
    },
    plantedAt: {
      type: Date,
    },
    progressLinkedVocabulary: {
      type: Schema.Types.ObjectId,
      ref: "VocabularyProgress",
    },
    status: {
      type: String,
      enum: ["IN_USE", "IN_INVENTORY", "EXPIRED"],
      default: "IN_INVENTORY",
    },
  },
  {
    timestamps: true,
  }
);

const GardenItem = mongoose.model("GardenItem", gardenItemSchema);
module.exports = GardenItem;
