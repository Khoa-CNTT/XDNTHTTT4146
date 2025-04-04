const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class CoinTransaction extends Model {}

CoinTransaction.init(
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
        model: "Users",
        key: "id",
      },
    },
    type: {
      type: DataTypes.ENUM("earn", "spend", "purchase"),
      allowNull: false,
      comment: "earn: Nhận xu, spend: Tiêu xu, purchase: Mua xu",
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Số lượng xu thay đổi (có thể là dương hoặc âm)",
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "Mô tả chi tiết giao dịch",
    },
    referenceId: {
      type: DataTypes.UUID,
      allowNull: true,
      comment:
        "Liên kết đến ID giao dịch liên quan (game, bài học, thanh toán, v.v.)",
    },
  },
  {
    sequelize,
    modelName: "CoinTransaction",
    tableName: "coin_transactions",
    timestamps: true,
    paranoid: true,
  }
);

module.exports = CoinTransaction;
