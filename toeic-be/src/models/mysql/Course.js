const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/mysql");
const Lesson = require("./Lesson");
const User = require("./User");
const CourseUser = require("./CourseUser");

class Course extends Model {
  static associate(models) {
    Course.hasMany(models.Lesson, { foreignKey: "courseId" });

    Course.belongsToMany(models.User, {
      through: models.CourseUser,
      foreignKey: "courseId",
      otherKey: "userId",
    });
  }
}

Course.init(
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
    image: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      allowNull: false,
      defaultValue: "active",
    },
  },
  {
    sequelize,
    modelName: "Course",
    tableName: "courses",
    timestamps: true,
  }
);

module.exports = Course;
