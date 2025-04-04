const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");
const User = require("./User");

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
        model: User,
        key: "id",
      },
    },
    source: {
      type: DataTypes.ENUM("lesson", "game", "mission", "event"),
      allowNull: false,
    },
    exp: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "ExpHistory",
    timestamps: true, // Tự động tạo `createdAt` và `updatedAt`
  }
);

// Thiết lập quan hệ
ExpHistory.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });

module.exports = ExpHistory;
