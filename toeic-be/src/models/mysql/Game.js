const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class Game extends Model {
  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
      onDelete: "CASCADE",
    });
  }
}

Game.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    score: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    maxScore: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("active", "completed", "paused", "failed"),
      defaultValue: "active",
    },
    startDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    mode: {
      type: DataTypes.ENUM("solo", "timed", "challenge", "pvp"),
      allowNull: false,
      defaultValue: "solo",
    },
  },
  {
    sequelize,
    modelName: "Game",
    tableName: "games",
    timestamps: true,
    paranoid: true,
    indexes: [
      { fields: ["userId"] },
      { fields: ["status"] },
      { fields: ["mode"] },
    ],
  }
);

module.exports = Game;
