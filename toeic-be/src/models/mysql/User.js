const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class User extends Model {
  static associate(models) {
    this.belongsTo(models.Role, { foreignKey: "roleId", as: "role" });

    this.hasMany(models.UserBadge, { foreignKey: "userId", as: "badges" });
    this.hasMany(models.UserReward, { foreignKey: "userId", as: "rewards" });
    this.hasMany(models.MockResult, {
      foreignKey: "userId",
      as: "mockResults",
    });
    this.hasMany(models.ExpHistory, { foreignKey: "userId", as: "expHistory" });
    this.hasMany(models.CoinTransaction, {
      foreignKey: "userId",
      as: "coinTransactions",
    });
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
      validate: {
        len: [4, 30],
        is: /^[a-zA-Z0-9_.-]*$/,
      },
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
    },
    roleId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "roles", key: "id" },
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    avatar: {
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
    status: {
      type: DataTypes.ENUM("active", "banned", "pending", "deleted"),
      defaultValue: "active",
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    exp: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    level: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    metadata: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
    paranoid: true,
    underscored: true,
    indexes: [
      { fields: ["email"], unique: true },
      { fields: ["username"], unique: true },
      { fields: ["roleId"] },
    ],
  }
);

module.exports = User;
