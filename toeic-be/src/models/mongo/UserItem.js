const mongoose = require("mongoose");

const UserItemSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },
    acquiredAt: {
      type: Date,
      default: Date.now,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const UserItem = mongoose.model("UserItem", UserItemSchema);

module.exports = UserItem;
