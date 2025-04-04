const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class UserReward extends Model {}

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
    receivedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "UserReward",
    tableName: "user_rewards",
    timestamps: false,
  }
);

module.exports = UserReward;
