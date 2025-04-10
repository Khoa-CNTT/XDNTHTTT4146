const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../config/mysql");

class Exp extends Model {}

Exp.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    exp: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "exp",
    timestamps: false,
  }
);

module.exports = Exp;
