const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/mysql");
const User = require("./User");

class Leaderboard extends Model {}

Leaderboard.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    total_exp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    rank: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    last_updated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Leaderboard",
    timestamps: true,
    indexes: [{ unique: false, fields: ["total_exp"] }],
  }
);

module.exports = Leaderboard;
