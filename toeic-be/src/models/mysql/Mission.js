const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/mysql");

class Mission extends Model {}

Mission.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM("daily", "weekly", "event"),
      allowNull: false,
    },
    goal: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reward_exp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    reward_coins: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: "Mission",
    timestamps: true,
  }
);

module.exports = Mission;
