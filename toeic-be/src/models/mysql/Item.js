const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/mysql");

class Item extends Model {
  static associate(models) {
    Item.belongsTo(models.Garden, { foreignKey: "gardenId", as: "garden" });

    Item.belongsTo(models.ItemType, {
      foreignKey: "itemTypeId",
      as: "itemType",
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
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    effectType: {
      type: DataTypes.ENUM("XP", "TIME", "FERTILITY"), // Loại hiệu ứng của vật phẩm
      allowNull: true,
    },
    effectValue: {
      type: DataTypes.INTEGER,
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
