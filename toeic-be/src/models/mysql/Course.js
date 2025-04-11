const { DataTypes, Model, Op } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class Course extends Model {}

Course.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    image: {
      type: DataTypes.STRING(2048),
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
    status: {
      type: DataTypes.ENUM("active", "inactive", "archived"),
      defaultValue: "active",
    },
    category: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    level: {
      type: DataTypes.ENUM("beginner", "intermediate", "advanced"),
      allowNull: true,
    },
    creatorId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "Users",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Course",
    tableName: "courses",
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

module.exports = Course;
