const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");
const User = require("./User");
const Seed = require("./Seed");
class VocabularyGarden extends Model {
  static associate(models) {
    VocabularyGarden.belongsTo(models.User, { foreignKey: "userId" });
    VocabularyGarden.belongsTo(models.Seed, { foreignKey: "seedId" });
  }
}

VocabularyGarden.init(
  {
    userId: { type: DataTypes.UUID, allowNull: false },
    seedId: { type: DataTypes.UUID, allowNull: false },
    word: { type: DataTypes.STRING, allowNull: false },
    meaning: { type: DataTypes.STRING, allowNull: false },
    example: { type: DataTypes.STRING },
    status: {
      type: DataTypes.ENUM("planted", "growing", "harvested"),
      defaultValue: "planted",
    },
    progress: { type: DataTypes.INTEGER, defaultValue: 0 },
  },
  {
    sequelize,
    tableName: "vocabulary_garden",
    timestamps: true,
    paranoid: true,
  }
);

module.exports = VocabularyGarden;
