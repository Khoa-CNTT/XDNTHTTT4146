const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class SystemNotification extends Model {}

SystemNotification.init(
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
      allowNull: false,
    },
    senderId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    targetRole: {
      type: DataTypes.ENUM("student", "teacher", "all"),
      allowNull: false,
      defaultValue: "all",
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: "SystemNotification",
    tableName: "system_notifications",
    timestamps: true,
  }
);

SystemNotification.associate = (models) => {
  SystemNotification.belongsTo(models.User, {
    foreignKey: "senderId",
    as: "sender",
  });
};

module.exports = SystemNotification;
