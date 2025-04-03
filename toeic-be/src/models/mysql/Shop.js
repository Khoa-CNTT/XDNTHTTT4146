const { DataTypes, Model } = require("sequelize");

class Shop extends Model {
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
        description: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        image: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        location: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        status: {
          type: DataTypes.ENUM("active", "inactive"),
          defaultValue: "active",
        },
      },
      {
        sequelize,
        tableName: "shops",
        timestamps: true,
        paranoid: true,
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Item, { foreignKey: "shopId" });
  }
}

module.exports = Shop;
