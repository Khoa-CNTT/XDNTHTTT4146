const { DataTypes, Model, Op } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class CoinTransaction extends Model {
  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
  }
}

CoinTransaction.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    type: {
      type: DataTypes.ENUM("earn", "spend", "purchase"),
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    referenceId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    metadata: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "CoinTransaction",
    tableName: "coin_transactions",
    timestamps: true,
    paranoid: true,
    defaultScope: {
      where: { deletedAt: null },
    },
    scopes: {
      withDeleted: {},
      onlyDeleted: {
        where: {
          deletedAt: {
            [Op.ne]: null,
          },
        },
      },
    },
  }
);

module.exports = CoinTransaction;
