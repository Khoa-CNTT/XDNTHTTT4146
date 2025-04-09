const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class Image extends Model {
  static associate(models) {
    Image.belongsTo(models.Vocabulary, {
      foreignKey: "vocabularyId",
      as: "vocabulary",
    });
  }
}

Image.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    vocabularyId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "vocabularies",
        key: "id",
      },
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Image",
    tableName: "images",
    timestamps: true,
    paranoid: true,
  }
);

module.exports = Image;
