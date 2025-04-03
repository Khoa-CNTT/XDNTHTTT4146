const { DataTypes, Model } = require("sequelize");

class Item extends Model {
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
        description: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        image: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        price: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        stock: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        tableName: "items",
        timestamps: true,
        paranoid: true, // Soft delete
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Shop, { foreignKey: "shopId" });
  }
}

module.exports = Item;
