const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class Role extends Model {
  static associate(models) {
    Role.hasMany(models.User, {
      foreignKey: "roleId",
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
    },
  },
  {
    sequelize,
    tableName: "roles",
    timestamps: false,
  }
);

module.exports = Role;
