const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class Invoice extends Model {
  static associate(models) {
    this.belongsTo(models.Payment, {
      foreignKey: "paymentId",
      as: "payment",
      onDelete: "CASCADE",
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
    paymentId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "payments",
        key: "id",
      },
    },
    items: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    taxAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    shippingFee: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("paid", "unpaid", "refunded"),
      defaultValue: "unpaid",
      allowNull: false,
    },
    invoiceDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Invoice",
    tableName: "invoices",
    timestamps: true,
    paranoid: true,
    underscored: true,
  }
);

module.exports = Invoice;
