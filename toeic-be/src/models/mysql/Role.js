const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class Role extends Model {
  static associate(models) {
    this.hasMany(models.User, {
      foreignKey: "roleId",
      as: "users",
    });
  }
}

Role.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isIn: [["admin", "teacher", "student"]],
      },
    },

    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    permissions: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Role",
    tableName: "roles",
    timestamps: true,
    paranoid: false,
    underscored: true,
  }
);

module.exports = Role;
