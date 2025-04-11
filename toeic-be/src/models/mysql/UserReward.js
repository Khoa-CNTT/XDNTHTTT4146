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

// Associations outside of static method (if needed in index.js)
UserReward.belongsTo(User, { foreignKey: "userId", as: "user" });
UserReward.belongsTo(Reward, { foreignKey: "rewardId", as: "reward" });

module.exports = UserReward;
