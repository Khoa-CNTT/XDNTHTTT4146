const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class Shop extends Model {
  static associate(models) {
    // Shop có nhiều Item, liên kết thông qua shopId
    this.hasMany(models.Item, {
      foreignKey: "shopId",
      as: "items",
      onDelete: "CASCADE",
    });

    // Shop có nhiều Image, liên kết thông qua shopId (dùng scope 'shop' nếu cần)
    this.hasMany(models.Image, {
      foreignKey: "shopId",
      as: "images",
      onDelete: "CASCADE",
    });
  }
}

Shop.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    category: {
      type: DataTypes.ENUM("default", "event", "vip", "limited"),
      allowNull: false,
      defaultValue: "default",
    },

    status: {
      type: DataTypes.ENUM("active", "inactive", "archived"),
      defaultValue: "active",
      allowNull: false,
    },

    isFeatured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Shop",
    tableName: "shops",
    timestamps: true,
    paranoid: true,
    underscored: true,
    indexes: [{ fields: ["category"] }, { fields: ["status"] }],
  }
);

module.exports = Shop;
