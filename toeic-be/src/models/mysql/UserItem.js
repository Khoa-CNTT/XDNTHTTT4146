const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class UserItem extends Model {
  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
      onDelete: "CASCADE",
    });

    this.belongsTo(models.Item, {
      foreignKey: "itemId",
      as: "item",
      onDelete: "CASCADE",
    });
  }
}

UserItem.init(
  {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    itemId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      validate: {
        min: 1,
      },
    },
    acquiredAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "UserItem",
    tableName: "user_items",
    timestamps: true,
    paranoid: true,
    underscored: true,
    indexes: [
      { fields: ["userId"] },
      { fields: ["itemId"] },
      { unique: true, fields: ["userId", "itemId"] },
    ],
  }
);

module.exports = UserItem;
