const { DataTypes, Model, Op } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class Coupon extends Model {}

Coupon.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        len: [4, 50],
      },
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    discountType: {
      type: DataTypes.ENUM("percentage", "fixed"),
      allowNull: false,
    },
    discountValue: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    maxUsage: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "Số lần coupon có thể được sử dụng (null = không giới hạn)",
    },
    usedCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    expiredAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: "Coupon",
    tableName: "coupons",
    timestamps: true,
    paranoid: true,
    defaultScope: {
      where: { deletedAt: null },
    },
    scopes: {
      withDeleted: {},
      onlyDeleted: {
        where: {
          deletedAt: {
            [Op.ne]: null,
          },
        },
      },
    },
  }
);

module.exports = Coupon;
