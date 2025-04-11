const mongoose = require("mongoose");
const { Schema } = mongoose;

const EffectSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["expBoost", "coinBoost", "shield", "cosmetic", "other"],
      required: true,
    },
    multiplier: { type: Number }, // exp x2 chẳng hạn
    duration: { type: Number }, // tính theo giây
    extraData: Schema.Types.Mixed, // dữ liệu mở rộng (tùy item)
  },
  { _id: false }
);

const UserItemSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    itemId: {
      type: Schema.Types.ObjectId,
      ref: "Item",
      required: true,
      index: true,
    },
    quantity: {
      type: Number,
      default: 1,
      min: 0,
    },
    acquiredAt: {
      type: Date,
      default: Date.now,
    },
    expiresAt: {
      type: Date,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isLocked: {
      type: Boolean,
      default: false,
    },
    usedAt: {
      type: Date,
    },
    effect: {
      type: EffectSchema,
      default: undefined,
    },
  },
  { timestamps: true }
);

// Index tổng hợp
UserItemSchema.index({ userId: 1, itemId: 1 }, { unique: false });
UserItemSchema.index({ expiresAt: 1 });

class UserItemClass {
  /**
   * Lấy danh sách item đang active của user
   */
  static async getActiveItems(userId) {
    return this.find({ userId, isActive: true });
  }

  /**
   * Tiêu thụ 1 item (giảm quantity, đánh dấu dùng)
   */
  static async consumeItem(userId, itemId) {
    const item = await this.findOneAndUpdate(
      {
        userId,
        itemId,
        quantity: { $gt: 0 },
        isLocked: false,
      },
      {
        $inc: { quantity: -1 },
        usedAt: new Date(),
      },
      { new: true }
    );
    return item;
  }

  /**
   * Kiểm tra user có một item cụ thể không
   */
  static async hasItem(userId, itemId) {
    const item = await this.findOne({
      userId,
      itemId,
      quantity: { $gt: 0 },
    });
    return !!item;
  }

  /**
   * Tặng item cho user
   */
  static async grantItem({
    userId,
    itemId,
    quantity = 1,
    effect,
    expiresAt,
    isLocked = false,
  }) {
    return this.create({
      userId,
      itemId,
      quantity,
      effect,
      expiresAt,
      isLocked,
    });
  }
}

UserItemSchema.loadClass(UserItemClass);

module.exports = mongoose.model("UserItem", UserItemSchema);
