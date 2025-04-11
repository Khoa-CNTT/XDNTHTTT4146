const { DataTypes, Model, Op } = require("sequelize");
const { sequelize } = require("../../config/mysql");

class Badge extends Model {}

Badge.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING(2048),
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
    category: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: "general",
    },
  },
  {
    sequelize,
    modelName: "Badge",
    tableName: "badges",
    timestamps: true,
    paranoid: true,
    defaultScope: {
      where: {
        deletedAt: null,
      },
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

module.exports = Badge;
