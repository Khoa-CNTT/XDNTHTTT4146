const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class MissionReward extends Model {
  static associate(models) {
    this.belongsTo(models.Mission, {
      foreignKey: "missionId",
      as: "mission",
    });

    this.belongsTo(models.Reward, {
      foreignKey: "rewardId",
      as: "reward",
    });
  }
}

MissionReward.init(
  {
    missionId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "missions",
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
  },
  {
    sequelize,
    modelName: "MissionReward",
    tableName: "mission_rewards",
    timestamps: false,
    underscored: true,
  }
);

module.exports = MissionReward;
