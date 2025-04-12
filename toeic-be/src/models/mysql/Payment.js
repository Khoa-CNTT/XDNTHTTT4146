const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/mysql");

class Payment extends Model {
  static associate(models) {
    Payment.belongsTo(models.User, { foreignKey: "userId", as: "user" });
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
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    // Nếu là nạp coin thì số lượng coin nhận được
    coin: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // Loại giao dịch: Nạp tiền hay mua khóa học
    type: {
      type: DataTypes.ENUM("TOP_UP", "BUY_COURSE"),
      allowNull: false,
    },
    // Tham chiếu đến khóa học nếu là BUY_COURSE
    refId: {
      type: DataTypes.UUID,
      allowNull: true,
      comment: "Tham chiếu đến khóa học nếu type = BUY_COURSE",
    },
    status: {
      type: DataTypes.ENUM("PENDING", "SUCCESS", "FAILED"),
      defaultValue: "PENDING",
    },
    method: {
      type: DataTypes.STRING, // Phương thức thanh toán: MOMO, ZALOPAY, VN_PAY, BANK_TRANSFER, ...
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Payment",
    tableName: "payments",
    timestamps: true,
  }
);

module.exports = Payment;
