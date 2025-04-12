const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/mysql");

class Land extends Model {
  static associate(models) {
    Land.belongsTo(models.Image, {
      foreignKey: "imageId", // Ảnh đại diện chung cho đất
      as: "image",
    });
    Land.belongsTo(models.Image, {
      foreignKey: "statusImageId", // Ảnh theo trạng thái đất
      as: "statusImage",
    });
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
    statusImageId: {
      type: DataTypes.UUID,
      allowNull: true, // Sẽ liên kết với ảnh tương ứng với trạng thái của đất
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
      type: DataTypes.ENUM("FERTILE", "BARE", "DEPLETED"),
      defaultValue: "FERTILE",
    },
    fertility: {
      type: DataTypes.INTEGER, // Biểu thị độ màu mỡ của đất (0 - 100 %)
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
      defaultValue: 0, // Thêm điểm thưởng nếu user học tốt
    },
    lastPlantedAt: {
      type: DataTypes.DATE,
      allowNull: true, // Dùng để tính thời gian không tương tác
    },
    price: {
      type: DataTypes.INTEGER, // Giá của đất (tính bằng coin)
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
