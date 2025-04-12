const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/mysql");

class Garden extends Model {
  static associate(models) {
    Garden.belongsTo(models.Course, {
      foreignKey: "courseId",
      allowNull: true,
    });
    Garden.hasMany(models.Plant, { foreignKey: "gardenId" });
  }
}

Garden.init(
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
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Garden",
    tableName: "gardens",
    timestamps: true,
  }
);
