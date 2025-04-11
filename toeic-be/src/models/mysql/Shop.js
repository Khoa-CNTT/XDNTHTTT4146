const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class Shop extends Model {
  static associate(models) {
    this.hasMany(models.Item, {
      foreignKey: "shopId",
      as: "items",
      onDelete: "CASCADE",
    });

    this.belongsTo(models.User, {
      foreignKey: "ownerId",
      as: "owner",
      onDelete: "SET NULL",
    });

    this.belongsToMany(models.User, {
      through: models.UserShopVisit,
      foreignKey: "shopId",
      otherKey: "userId",
      as: "visitors",
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
    location: {
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
    openAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    closeAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    ownerId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    isFeatured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    tags: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Shop",
    tableName: "shops",
    timestamps: true,
    paranoid: true,
    underscored: true,
    indexes: [
      { fields: ["category"] },
      { fields: ["status"] },
      { fields: ["ownerId"] },
      { fields: ["openAt", "closeAt"] },
    ],
  }
);

module.exports = Shop;
