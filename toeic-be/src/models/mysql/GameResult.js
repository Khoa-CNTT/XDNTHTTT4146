const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class GameResult extends Model {
  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
      onDelete: "CASCADE",
    });
    this.belongsTo(models.Game, {
      foreignKey: "gameId",
      as: "game",
      onDelete: "CASCADE",
    });
  }
}

GameResult.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    gameId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    maxScore: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("win", "lose", "draw", "aborted"),
      defaultValue: "win",
    },
    expEarned: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    coinEarned: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    refId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    refType: {
      type: DataTypes.ENUM("event", "mission", "none"),
      defaultValue: "none",
    },
  },
  {
    sequelize,
    modelName: "GameResult",
    tableName: "game_results",
    timestamps: true,
    paranoid: true,
    indexes: [
      { fields: ["userId"] },
      { fields: ["gameId"] },
      { fields: ["status"] },
      { fields: ["refType", "refId"] },
    ],
  }
);

module.exports = GameResult;
