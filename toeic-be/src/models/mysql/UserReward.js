const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class UserReward extends Model {
  static associate(models) {
    UserReward.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
      onDelete: "CASCADE",
    });
    UserReward.belongsTo(models.Reward, {
      foreignKey: "rewardId",
      as: "reward",
      onDelete: "CASCADE",
    });
  }
}

UserReward.init(
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
    rewardId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    sourceType: {
      type: DataTypes.ENUM("Mission", "Payment", "MiniGame", "Event"),
      allowNull: false,
    },
    sourceId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    receivedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    note: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "UserReward",
    tableName: "user_rewards",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["userId", "rewardId", "sourceType", "sourceId"],
      },
    ],
  }
);

module.exports = UserReward;
