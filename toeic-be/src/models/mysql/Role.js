const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class Role extends Model {
  static init(sequelize) {
    super.init(
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
  }

  static associate(models) {
    this.belongsToMany(models.User, {
      through: "UserRoles",
      foreignKey: "roleId",
    });
  }
}

module.exports = Role;
