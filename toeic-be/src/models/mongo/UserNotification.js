const mongoose = require("mongoose");

const userNotificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ["reward", "badge", "mission", "levelUp", "announcement", "system"],
      required: true,
      index: true,
    },
    title: {
      type: String,
      default: "",
      trim: true,
    },
    message: {
      type: String,
      default: "",
      trim: true,
    },
    isRead: {
      type: Boolean,
      default: false,
      index: true,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    expiresAt: {
      type: Date,
      default: null,
      index: true,
    },
  },
  { timestamps: true }
);

userNotificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

userNotificationSchema.pre("save", function (next) {
  if (this.expiresAt && this.expiresAt < new Date()) {
    this.isRead = true;
  }
  next();
});

module.exports = mongoose.model("UserNotification", userNotificationSchema);
