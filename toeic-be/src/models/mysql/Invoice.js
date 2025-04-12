const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/mysql");

class Invoice extends Model {
  static associate(models) {
    Invoice.belongsTo(models.User, { foreignKey: "userId", as: "user" });
    Invoice.belongsTo(models.Course, { foreignKey: "courseId", as: "course" });
    Invoice.belongsTo(models.Payment, {
      foreignKey: "paymentId",
      as: "payment",
    });
  }
}

Invoice.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    invoiceCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    courseId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    paymentId: {
      type: DataTypes.UUID,
      allowNull: true,
      comment: "Tham chiếu đến giao dịch thanh toán nếu có",
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("PENDING", "PAID", "CANCELLED"),
      defaultValue: "PENDING",
    },
  },
  {
    sequelize,
    modelName: "Invoice",
    tableName: "invoices",
    timestamps: true,
  }
);

module.exports = Invoice;
