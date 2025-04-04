const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class Badge extends Model {}

Badge.init(
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
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
  },
  {
    sequelize,
    modelName: "Badge",
    tableName: "badges",
    timestamps: true,
    paranoid: true,
  }
);

module.exports = Badge;
