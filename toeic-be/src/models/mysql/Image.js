const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class Image extends Model {}

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
      validate: {
        isUrl: true,
      },
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    refId: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        isUUID: 4,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tag: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    priority: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    metadata: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Image",
    tableName: "images",
    timestamps: true,
    paranoid: true,
    indexes: [{ fields: ["type", "refId"] }, { fields: ["tag"] }],
  }
);

module.exports = Image;
