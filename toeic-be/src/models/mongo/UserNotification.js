const mongoose = require("mongoose");
const userNotificationSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["reward", "badge", "mission", "levelUp", "announcement"],
      required: true,
    },
    title: String,
    message: String,
    isRead: {
      type: Boolean,
      default: false,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserNotification", userNotificationSchema);
