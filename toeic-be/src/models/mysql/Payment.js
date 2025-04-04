const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class Payment extends Model {
  static init(sequelize) {
    super.init(
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
        method: {
          type: DataTypes.ENUM("VNPAY", "MOMO"),
          allowNull: false,
        },
        status: {
          type: DataTypes.ENUM("pending", "completed", "failed"),
          defaultValue: "pending",
        },
        transactionId: {
          type: DataTypes.STRING,
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
        tableName: "payments",
        timestamps: true,
        paranoid: true,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "userId" });
  }
}

module.exports = Payment;
