const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class Level extends Model {}

Level.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    levelName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 50],
      },
    },
    targetScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 990,
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    studyGoal: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    expRequired: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    badgeId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "Level",
    tableName: "levels",
    timestamps: true,
    paranoid: true,
    indexes: [{ fields: ["expRequired"] }, { fields: ["order"] }],
  }
);

module.exports = Level;
