"use strict";

const bcrypt = require("bcryptjs");
const { UUIDV4 } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Lấy roleId từ bảng roles
    const adminRole = await queryInterface.rawSelect(
      "roles",
      { where: { name: "admin" } },
      ["id"]
    );

    const teacherRole = await queryInterface.rawSelect(
      "roles",
      { where: { name: "teacher" } },
      ["id"]
    );

    const studentRole = await queryInterface.rawSelect(
      "roles",
      { where: { name: "student" } },
      ["id"]
    );

    if (!adminRole || !teacherRole || !studentRole) {
      throw new Error("One or more roles do not exist in the roles table.");
    }

    const hashedPassword = await bcrypt.hash("123456", 32);

    await queryInterface.bulkInsert(
      "users",
      [
        {
          id: UUIDV4(),
          username: "adminuser",
          email: "admin@example.com",
          password: hashedPassword,
          roleId: adminRole[0],
          status: "active",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: UUIDV4(),
          username: "teacheruser",
          email: "teacher@example.com",
          password: hashedPassword,
          roleId: teacherRole[0],
          status: "active",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: UUIDV4(),
          username: "studentuser",
          email: "student@example.com",
          password: hashedPassword,
          roleId: studentRole[0],
          status: "active",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
