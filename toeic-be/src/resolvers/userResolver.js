const userService = require("../services/userService");
const authService = require("../services/authService"); // Đảm bảo đã import authService để sử dụng logic đăng nhập bằng Google

const userResolver = {
  Query: {
    getUser: (_, { id }) => {
      return userService.getUserById(id);
    },
    getUsers: (_, { limit = 10, offset = 0 }) => {
      return userService.getUsers(limit, offset);
    },
  },

  Mutation: {
    createUser: (_, { input }) => {
      return userService.register(input); // Sử dụng register từ userService để tạo người dùng mới
    },

    updateUser: (_, { id, input }) => {
      return userService.updateUser(id, input);
    },

    deleteUser: (_, { id }) => {
      return userService.deleteUser(id);
    },

    loginWithGoogle: async (_, { idToken }) => {
      // Đăng nhập với Google
      return await authService.loginWithGoogle(idToken);
    },

    forgotPassword: async (_, { email }) => {
      // Gửi email reset mật khẩu
      return await userService.forgotPassword(email);
    },

    resetPassword: async (_, { token, newPassword }) => {
      // Đặt lại mật khẩu bằng token
      return await userService.resetPassword(token, newPassword);
    },

    updateProfile: (_, { id, input }) => {
      // Cập nhật thông tin người dùng
      return userService.updateProfile(id, input);
    },
  },

  User: {
    role: async (parent) => {
      // Lấy thông tin role của người dùng
      return await parent.getRole();
    },
  },
};

module.exports = userResolver;
