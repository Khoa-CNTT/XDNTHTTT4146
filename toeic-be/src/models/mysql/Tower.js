const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/mysql");

class Tower extends Model {
  static associate(models) {
    Tower.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });

    Tower.hasMany(models.Floor, {
      foreignKey: "towerId",
      as: "floors",
    });
  }
}

Tower.addHook("afterCreate", async (tower, options) => {
  const floors = [
    { floor: 1, miniGameName: "Game A", toeicScore: 200 },
    { floor: 2, miniGameName: "Game B", toeicScore: 300 },
    { floor: 3, miniGameName: "Game C", toeicScore: 450 },
    { floor: 4, miniGameName: "Game D", toeicScore: 550 },
    { floor: 5, miniGameName: "Game E", toeicScore: 650 },
    { floor: 6, miniGameName: "Game F", toeicScore: 750 },
    { floor: 7, miniGameName: "Game G", toeicScore: 850 },
  ];

  for (const floor of floors) {
    const miniGame = await models.MiniGame.findOrCreate({
      where: { name: floor.miniGameName },
      defaults: { name: floor.miniGameName },
    });

    // Tạo tầng với miniGameId
    await tower.createFloor({
      floor: floor.floor,
      miniGameId: miniGame[0].id,
      toeicScore: floor.toeicScore,
      towerId: tower.id,
    });
  }
});

Tower.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
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
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 7,
      },
    },
    exp: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Tower",
    tableName: "towers",
    timestamps: false,
  }
);

module.exports = Tower;
