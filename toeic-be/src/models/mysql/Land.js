const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/mysql");

class Land extends Model {
  static associate(models) {
    Land.belongsTo(models.Image, { foreignKey: "imageId" });
    Land.belongsTo(models.Garden, {
      foreignKey: "gardenId",
      allowNull: true,
    });
    Land.hasMany(models.Plant, { foreignKey: "landId" });
  }
}

Land.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    imageId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    gardenId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("ACTIVE", "LOCKED", "DELETED"),
      defaultValue: "ACTIVE",
    },
    fertility: {
      type: DataTypes.INTEGER, // biểu thị độ màu mỡ của đất (0 - 100 %)
      defaultValue: 50,
      allowNull: false,
      validate: {
        min: 0,
        max: 100,
      },
    },
    vocabularyCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    quality: {
      type: DataTypes.ENUM("BAD", "NORMAL", "GOOD", "EXCELLENT"),
      defaultValue: "NORMAL",
      allowNull: false,
    },
    expBonus: {
      type: DataTypes.INTEGER,
      defaultValue: 0, // thêm điểm thưởng nếu user học tốt
    },
    lastPlantedAt: {
      type: DataTypes.DATE,
      allowNull: true, // dùng để tính thời gian không tương tác
    },
    price: {
      type: DataTypes.INTEGER, // giá của đất (tính bằng coin)
      defaultValue: 0,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Land",
    tableName: "lands",
    timestamps: true,
  }
);

module.exports = Land;
