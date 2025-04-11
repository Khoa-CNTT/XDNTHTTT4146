const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class ExpLevel extends Model {}

ExpLevel.init(
  {
    level: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    requiredExp: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "ExpLevel",
    tableName: "exp_levels",
    timestamps: false,
  }
);

module.exports = ExpLevel;
