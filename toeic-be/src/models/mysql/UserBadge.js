const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class UserBadge extends Model {
  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
      onDelete: "CASCADE",
    });

    this.belongsTo(models.Reward, {
      foreignKey: "rewardId",
      as: "reward",
      onDelete: "SET NULL",
    });
  }
}

UserBadge.init(
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
      onDelete: "CASCADE",
    },

    rewardId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "rewards",
        key: "id",
      },
      onDelete: "SET NULL",
    },

    grantedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: "UserBadge",
    tableName: "user_badges",
    timestamps: true,
    paranoid: true,
    underscored: true,
    indexes: [{ fields: ["userId"] }, { fields: ["rewardId"] }],
  }
);

module.exports = UserBadge;
