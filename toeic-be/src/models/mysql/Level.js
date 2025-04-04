const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class Level extends Model {}

Level.init(
  {
    levelName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    targetScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    studyGoal: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Level",
    tableName: "levels",
    timestamps: true,
  }
);

module.exports = Level;
