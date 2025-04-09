const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");
const User = require("./User");
const Reward = require("./Reward");

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
      references: {
        model: "users",
        key: "id",
      },
    },

    rewardId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "rewards",
        key: "id",
      },
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

// Associations outside of static method (if needed in index.js)
UserReward.belongsTo(User, { foreignKey: "userId", as: "user" });
UserReward.belongsTo(Reward, { foreignKey: "rewardId", as: "reward" });

module.exports = UserReward;
