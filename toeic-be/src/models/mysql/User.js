const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class User extends Model {
  static associate(models) {
    this.belongsTo(models.Role, { foreignKey: "roleId", as: "role" });

    this.hasMany(models.UserBadge, { foreignKey: "userId" });
    this.hasMany(models.UserReward, { foreignKey: "userId" });
    this.hasMany(models.MockResult, { foreignKey: "userId" });
    this.hasMany(models.UserTowerLevel, { foreignKey: "userId" });
    this.hasMany(models.UserGardenLevel, { foreignKey: "userId" });
    this.hasMany(models.UserActivityLog, { foreignKey: "userId" });
    this.hasMany(models.ExpHistory, { foreignKey: "userId" });
    this.hasMany(models.CoinTransaction, { foreignKey: "userId" });

    this.hasMany(models.SystemNotification, {
      foreignKey: "senderId",
      as: "notificationsSent",
    });

    this.belongsToMany(models.Course, {
      through: models.CourseUser,
      foreignKey: "userId",
      otherKey: "courseId",
      as: "enrolledCourses",
    });
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Đã hash trước khi lưu",
    },

    roleId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "roles",
        key: "id",
      },
    },

    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    fullName: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    gender: {
      type: DataTypes.ENUM("male", "female", "other"),
      allowNull: true,
    },

    dob: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    isBanned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    exp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
    paranoid: true,
    underscored: true,
  }
);

module.exports = User;
