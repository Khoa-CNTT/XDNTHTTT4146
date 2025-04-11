const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class ExpHistory extends Model {}

ExpHistory.init(
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
        model: "users",
        key: "id",
      },
    },
    source: {
      type: DataTypes.ENUM(
        "lesson",
        "quiz",
        "game",
        "mission",
        "event",
        "vocabulary",
        "admin",
        "daily_mission",
        "challenge"
      ),
      allowNull: false,
    },
    sourceId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    vocabularyId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "vocabulary",
        key: "id",
      },
    },
    exp: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    metadata: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "ExpHistory",
    tableName: "exp_history",
    timestamps: true,
    updatedAt: false,
  }
);

module.exports = ExpHistory;
