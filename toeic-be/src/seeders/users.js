"use strict";

const bcrypt = require("bcryptjs");
const { UUIDV4 } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Tạo một số người dùng mẫu
    const hashedPassword = await bcrypt.hash("123456", 10); // Mã hóa mật khẩu cho người dùng

    await queryInterface.bulkInsert(
      "users", // Tên bảng
      [
        {
          id: UUIDV4(), // Tạo UUID cho người dùng
          name: "Admin User",
          email: "admin@example.com",
          password: hashedPassword, // Mật khẩu đã mã hóa
          roleId: "admin-role-id", // Giả sử bạn đã có một ID role trong bảng `roles`
          status: "active", // Trạng thái người dùng
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: UUIDV4(),
          name: "Teacher User",
          email: "teacher@example.com",
          password: hashedPassword,
          roleId: "teacher-role-id",
          status: "active",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: UUIDV4(),
          name: "Student User",
          email: "student@example.com",
          password: hashedPassword,
          roleId: "student-role-id",
          status: "active",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    // Xóa tất cả người dùng khi rollback
    await queryInterface.bulkDelete("users", null, {});
  },
};
