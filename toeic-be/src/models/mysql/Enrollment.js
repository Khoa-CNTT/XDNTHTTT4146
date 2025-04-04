const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class Enrollment extends Model {
  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
    this.belongsTo(models.Course, {
      foreignKey: "courseId",
      as: "course",
    });
  }
}

Enrollment.init(
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
    courseId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
    },
  },
  {
    sequelize,
    modelName: "Enrollment",
    tableName: "enrollments",
    timestamps: true,
    paranoid: true,
  }
);

module.exports = Enrollment;
