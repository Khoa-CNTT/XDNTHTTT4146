const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/mysql");

class Image extends Model {
  static associate(models) {
    // Liên kết với Item
    Image.belongsTo(models.Item, {
      foreignKey: "itemId",
      as: "item",
    });

    Image.hasMany(models.Land, {
      foreignKey: "statusImageId", // liên kết với đất theo trạng thái
      as: "landsWithStatusImage",
    });
  }
}

Image.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Image",
    tableName: "images",
    timestamps: true,
    underscored: true,
  }
);

module.exports = { Image };
