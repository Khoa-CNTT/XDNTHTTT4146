const { DataTypes, Model } = require("sequelize");

class Enrollment extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        userId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        courseId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        status: {
          type: DataTypes.ENUM("active", "inactive"),
          defaultValue: "active",
        },
      },
      {
        sequelize,
        tableName: "enrollments",
        timestamps: true,
        paranoid: true,
      }
    );
  }
}
module.exports = Enrollment;
