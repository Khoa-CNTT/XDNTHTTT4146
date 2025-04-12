const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/mysql");

class Item extends Model {}
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
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    imageId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("ACTIVE", "LOCKED", "DELETED"),
      defaultValue: "ACTIVE",
    },
  },
  {
    sequelize,
    modelName: "Item",
    tableName: "items",
    timestamps: false,
  }
);
module.exports = Item;
