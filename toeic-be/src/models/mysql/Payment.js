const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class Payment extends Model {
  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
      onDelete: "CASCADE",
    });

    this.belongsTo(models.Course, {
      foreignKey: "courseId",
      as: "course",
      onDelete: "SET NULL",
    });

    this.belongsTo(models.Coupon, {
      foreignKey: "couponId",
      as: "coupon",
      onDelete: "SET NULL",
    });
  }
}

Payment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },

    courseId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "courses",
        key: "id",
      },
    },

    couponId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "coupons",
        key: "id",
      },
    },

    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: { min: 0.01 },
    },

    finalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0.0,
        max(value) {
          if (this.amount < value) {
            throw new Error(
              "Final amount cannot be greater than the original amount"
            );
          }
        },
      },
    },

    method: {
      type: DataTypes.ENUM("VNPAY", "MOMO", "PAYPAL", "BANK", "CASH"),
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("pending", "completed", "failed", "refunded"),
      defaultValue: "pending",
      allowNull: false,
    },

    transactionId: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    invoiceCode: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },

    metadata: {
      type: DataTypes.JSON,
      allowNull: true,
    },

    paymentDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Payment",
    tableName: "payments",
    timestamps: true,
    paranoid: true,
    underscored: true,
    hooks: {
      beforeUpdate: (payment, options) => {
        if (payment.status === "failed") {
          // Thêm logic xử lý nếu cần khi trạng thái thanh toán là "failed"
        }
      },
    },
    indexes: [
      { fields: ["userId"] },
      { fields: ["courseId"] },
      { fields: ["couponId"] },
      { fields: ["transactionId"] },
      { fields: ["status"] },
    ],
  }
);

module.exports = Payment;
