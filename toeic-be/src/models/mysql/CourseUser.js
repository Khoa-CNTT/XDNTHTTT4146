const { DataTypes, Model, Op } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class CourseUser extends Model {
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

CourseUser.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    courseId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Courses",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    status: {
      type: DataTypes.ENUM("active", "inactive", "completed", "expired"),
      defaultValue: "active",
    },
    progress: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 1,
      },
    },
    enrolledAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    completedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "CourseUser",
    tableName: "course_users",
    timestamps: true,
    paranoid: true,
    defaultScope: {
      where: { deletedAt: null },
    },
    scopes: {
      withDeleted: {},
      onlyDeleted: {
        where: { deletedAt: { [Op.ne]: null } },
      },
    },
  }
);

module.exports = CourseUser;
