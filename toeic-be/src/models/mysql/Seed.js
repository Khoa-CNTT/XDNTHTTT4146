const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/mysql");

class Seed extends Model {}

Seed.init(
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
      type: DataTypes.TEXT,
      allowNull: true,
    },
    total_words: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Seed",
    tableName: "seeds",
    timestamps: true,
  }
);

module.exports = Seed;
