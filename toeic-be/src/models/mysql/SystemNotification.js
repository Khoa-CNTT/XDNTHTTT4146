const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class SystemNotification extends Model {
  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: "senderId",
      as: "sender",
    });

    this.belongsTo(models.User, {
      foreignKey: "targetUserId",
      as: "targetUser",
    });
  }
}

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
    type: {
      type: DataTypes.ENUM("info", "warning", "achievement", "event", "system"),
      allowNull: false,
      defaultValue: "info",
    },
    targetRole: {
      type: DataTypes.ENUM("student", "teacher", "admin", "all"),
      allowNull: false,
      defaultValue: "all",
    },
    targetUserId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    senderId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    startAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    endAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    priority: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    modelName: "SystemNotification",
    tableName: "system_notifications",
    timestamps: true,
    paranoid: true,
    underscored: true,
    indexes: [
      { fields: ["targetRole"] },
      { fields: ["isActive"] },
      { fields: ["startAt", "endAt"] },
      { fields: ["senderId"] },
      { fields: ["targetUserId"] },
    ],
  }
);

module.exports = SystemNotification;
