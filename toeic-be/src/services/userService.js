const bcrypt = require("bcrypt");
const { User } = require("../models/mysql");
const { GraphQLError } = require("graphql");
const { Op } = require("sequelize");
const fs = require("fs");
const path = require("path");

const userService = {
  // Cập nhật avatar của người dùng
  updateUserAvatar: async (userId, base64Image) => {
    try {
      // Tạo tên file ảnh từ ID người dùng
      const imageName = `avatar_${userId}.png`;
      const imagePath = path.join(__dirname, "..", "uploads", imageName);

      // Chuyển đổi base64 thành ảnh và lưu trữ
      const imageBuffer = Buffer.from(base64Image, "base64");
      await fs.promises.writeFile(imagePath, imageBuffer);

      // Cập nhật avatar vào cơ sở dữ liệu
      const user = await User.findByPk(userId);
      if (!user) {
        throw new GraphQLError("User not found", {
          extensions: { code: "NOT_FOUND" },
        });
      }

      await user.update({ avatar: imageName });
      return {
        status: true,
        msg: "Avatar updated successfully!",
        avatar: imageName,
      };
    } catch (error) {
      throw new GraphQLError("Failed to update avatar", {
        extensions: { code: "INTERNAL_SERVER_ERROR" },
      });
    }
  },

  // Cập nhật thông tin người dùng
  updateUserProfile: async (userId, name, avatar) => {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new GraphQLError("User not found", {
          extensions: { code: "NOT_FOUND" },
        });
      }

      await user.update({ name, avatar });
      return { status: true, msg: "Profile updated successfully.", user };
    } catch (error) {
      throw new GraphQLError("Failed to update profile", {
        extensions: { code: "INTERNAL_SERVER_ERROR" },
      });
    }
  },

  // Đổi mật khẩu người dùng
  changeUserPassword: async (userId, currentPassword, newPassword) => {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new GraphQLError("User not found", {
          extensions: { code: "NOT_FOUND" },
        });
      }

      // Kiểm tra mật khẩu hiện tại
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        throw new GraphQLError("Current password is incorrect", {
          extensions: { code: "UNAUTHORIZED" },
        });
      }

      // Mã hóa mật khẩu mới
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      await user.update({ password: hashedNewPassword });

      return { status: true, msg: "Password changed successfully." };
    } catch (error) {
      throw new GraphQLError("Failed to change password", {
        extensions: { code: "INTERNAL_SERVER_ERROR" },
      });
    }
  },

  // Xử lý đăng nhập
  loginUser: async (email, password) => {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new GraphQLError("User not found", {
        extensions: { code: "NOT_FOUND" },
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new GraphQLError("Invalid password", {
        extensions: { code: "UNAUTHORIZED" },
      });
    }

    return user;
  },

  // Kiểm tra email đã tồn tại chưa
  checkEmailExistence: async (email) => {
    const user = await User.findOne({ where: { email } });
    return user !== null;
  },

  // Tạo người dùng mới
  registerUser: async (name, email, password) => {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new GraphQLError("Email already in use", {
        extensions: { code: "BAD_REQUEST" },
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "student",
      exp: 0,
      coins: 0,
    });

    return user;
  },

  // Xử lý khóa tài khoản người dùng
  lockUserAccount: async (userId) => {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new GraphQLError("User not found", {
        extensions: { code: "NOT_FOUND" },
      });
    }

    if (user.status === "banned") {
      throw new GraphQLError("User is already banned", {
        extensions: { code: "BAD_REQUEST" },
      });
    }

    await user.update({ status: "banned" });
    return { status: true, msg: "User has been banned successfully." };
  },

  // Xử lý mở khóa tài khoản người dùng
  unlockUserAccount: async (userId) => {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new GraphQLError("User not found", {
        extensions: { code: "NOT_FOUND" },
      });
    }

    if (user.status === "active") {
      throw new GraphQLError("User is already active", {
        extensions: { code: "BAD_REQUEST" },
      });
    }

    await user.update({ status: "active" });
    return { status: true, msg: "User has been activated successfully." };
  },

  // Xóa người dùng (soft delete)
  deleteUser: async (userId) => {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new GraphQLError("User not found", {
        extensions: { code: "NOT_FOUND" },
      });
    }

    await user.update({ status: "deleted" });
    return { status: true, msg: "User deleted (soft) successfully." };
  },
};

module.exports = userService;
