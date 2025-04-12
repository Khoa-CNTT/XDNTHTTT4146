const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class Item extends Model {
  static associate(models) {
    this.belongsToMany(models.User, {
      through: models.UserItem,
      foreignKey: "itemId",
      as: "users",
    });

    this.hasMany(models.Image, {
      foreignKey: "refId",
      scope: {
        type: "item",
      },
      as: "images",
    });

    this.belongsTo(models.Reward, {
      foreignKey: "rewardId",
      as: "reward",
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
    status: {
      type: DataTypes.ENUM("private", "public"),
      defaultValue: "public",
      allowNull: false,
    },
    availableFrom: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    availableTo: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    eventTag: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Item",
    tableName: "items",
    timestamps: true,
    paranoid: true,
    indexes: [
      { fields: ["category"] },
      { fields: ["status"] },
      { fields: ["rewardId"] },
    ],
  }
);

module.exports = Item;
