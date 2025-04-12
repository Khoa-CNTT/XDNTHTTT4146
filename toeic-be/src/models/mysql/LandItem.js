const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/mysql");

class LandItem extends Model {
  static associate(models) {
    LandItem.belongsTo(models.GardenItem, {
      foreignKey: "gardenItemId",
      as: "gardenItem",
    });
    LandItem.belongsTo(models.Land, {
      foreignKey: "landId",
      as: "land",
    });
  }
}

LandItem.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    gardenItemId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    landId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    plantedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "LandItem",
    tableName: "land_items",
    timestamps: true,
  }
);

module.exports = LandItem;
