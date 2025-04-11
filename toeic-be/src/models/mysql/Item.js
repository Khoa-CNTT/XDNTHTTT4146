const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class Item extends Model {
  static associate(models) {
    this.belongsToMany(models.User, {
      through: models.UserItem,
      foreignKey: "itemId",
      otherKey: "userId",
      as: "owners",
    });

    this.hasMany(models.Image, {
      foreignKey: "refId",
      scope: {
        type: "item",
      },
      as: "images",
    });
  }
}

Item.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
    category: {
      type: DataTypes.STRING,
      defaultValue: "general",
    },
    rarity: {
      type: DataTypes.ENUM("common", "rare", "epic", "legendary"),
      allowNull: false,
      defaultValue: "common",
    },
    effect: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: "Item",
    tableName: "items",
    timestamps: true,
    paranoid: true,
  }
);

module.exports = Item;
