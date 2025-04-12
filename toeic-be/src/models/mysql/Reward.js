const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class Reward extends Model {
  static associate(models) {
    this.hasMany(models.UserReward, {
      foreignKey: "rewardId",
      as: "userRewards",
    });
    this.belongsToMany(models.Mission, {
      through: models.MissionReward,
      foreignKey: "rewardId",
      otherKey: "missionId",
      as: "missionsRewarded",
    });
    this.belongsToMany(models.User, {
      through: models.UserReward,
      foreignKey: "rewardId",
      otherKey: "userId",
      as: "users",
    });
  }
}

Reward.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("badge", "coin", "exp", "voucher"),
      allowNull: false,
      defaultValue: "badge",
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: "Reward",
    tableName: "rewards",
    timestamps: true,
    paranoid: true,
    underscored: true,
    indexes: [{ fields: ["type"] }],
  }
);

module.exports = Reward;
