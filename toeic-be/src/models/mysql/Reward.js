const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class Reward extends Model {}

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
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Reward",
    tableName: "rewards",
    timestamps: true,
  }
);

// Tách phần association ra sau khi export
const associateReward = (models) => {
  Reward.hasMany(models.UserReward, { foreignKey: "rewardId" });
  Reward.hasMany(models.Mission, { foreignKey: "rewardId" });
  Reward.hasMany(models.Payment, { foreignKey: "rewardId" });

  Reward.belongsToMany(models.User, {
    through: models.UserReward,
    foreignKey: "rewardId",
  });

  Reward.belongsToMany(models.Mission, {
    through: models.MissionReward,
    foreignKey: "rewardId",
  });

  Reward.belongsToMany(models.Payment, {
    through: models.PaymentReward,
    foreignKey: "rewardId",
  });
};

module.exports = Reward;
module.exports.associate = associateReward;
