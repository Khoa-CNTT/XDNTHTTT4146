const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class Game extends Model {}

Game.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      validate: {
        isUUID: true,
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
    status: {
      type: DataTypes.ENUM("active", "completed", "paused"),
      defaultValue: "active",
      validate: {
        isIn: [["active", "completed", "paused"]],
      },
    },
    startDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Game",
    tableName: "games",
    timestamps: true,
    paranoid: true, // Xóa mềm  cho phép khôi phục lại khi cần thiết
    indexes: [
      { unique: false, fields: ["userId"] }, // Tạo chỉ mục cho trường 'userId'
      { unique: false, fields: ["status"] }, // Tạo chỉ mục cho trường 'status'
    ],
  }
);

module.exports = Game;
