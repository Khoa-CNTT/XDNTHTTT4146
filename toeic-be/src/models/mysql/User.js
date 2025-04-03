const { DataTypes, Model } = require("sequelize");

class User extends Model {
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
        avatar: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        exp: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
        },
        coin: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
        },
        status: {
          type: DataTypes.ENUM("active", "inactive", "banned"),
          defaultValue: "active",
        },
      },
      {
        sequelize,
        tableName: "users",
        timestamps: true,
        paranoid: true,
        indexes: [{ unique: true, fields: ["email"] }],
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Enrollment, { foreignKey: "userId" });
    this.belongsToMany(models.Role, {
      through: "UserRoles",
      foreignKey: "userId",
    });
    this.hasMany(models.Progress, { foreignKey: "userId" });
  }
}

module.exports = User;
