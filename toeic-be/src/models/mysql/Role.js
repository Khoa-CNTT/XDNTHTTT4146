const { sequelize, DataTypes } = require("sequelize");

class Role extends sequelize.Model {
  static associate(models) {
    Role.hasMany(models.User, { foreignKey: "roleId" });
  }
}
Role.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      Enum: ["admin", "teacher", "student"],
    },
  },
  {
    sequelize,
    modelName: "Role",
    tableName: "roles",
    timestamps: true,
  }
);

module.exports = { Role };
