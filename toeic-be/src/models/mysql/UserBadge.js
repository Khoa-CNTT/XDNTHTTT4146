const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class UserBadge extends Model {}

UserBadge.init(
  {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    badgeId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    awardedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    note: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "UserBadge",
    tableName: "user_badges",
    timestamps: false,
  }
);

module.exports = UserBadge;
