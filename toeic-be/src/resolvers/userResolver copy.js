const userService = require("../services/userService");
const { uploadBase64Image } = require("../utils/cloudinaryUploader");
const streamToBase64 = require("../utils/streamToBase64");
const userResolver = {
  Query: {
    // Lấy thông tin người dùng theo ID
    getUser: (_, { id }) => {
      return userService.getUserById(id);
    },

    // Lấy danh sách người dùng với phân trang
    getUsers: (_, { limit = 10, offset = 0 }) => {
      return userService.getUsers(limit, offset);
    },
  },

  Mutation: {
    // Tạo người dùng mới
    createUser: (_, { input }) => {
      return userService.register(input);
    },

    // Cập nhật thông tin người dùng
    updateUser: (_, { id, input }) => {
      return userService.updateUser(id, input);
    },
    // Khóa người dùng
    lockUser: (_, { id }) => {
      return userService.lockUser(id);
    },
    // Xóa người dùng
    deleteUser: (_, { id }) => {
      return userService.deleteUser(id);
    },

    // Đăng nhập với Google
    loginWithGoogle: async (_, { idToken }) => {
      return await userService.loginWithGoogle(idToken);
    },
    loginUser: async (_, { email, password }) => {
      return await userService.loginWithEmailAndPassword(email, password);
    },
    // Quên mật khẩu, gửi email reset
    forgotPassword: async (_, { email }) => {
      return await userService.forgotPassword(email);
    },

    // Đặt lại mật khẩu bằng token
    resetPassword: async (_, { token, newPassword }) => {
      return await userService.resetPassword(token, newPassword);
    },

    // Cập nhật thông tin hồ sơ người dùng
    updateProfile: (_, { id, input }) => {
      return userService.updateProfile(id, input);
    },

    // Cập nhật ảnh đại diện người dùng
    updateUserAvatar: async (_, { userId, file }, { models }) => {
      const user = await models.User.findByPk(userId);
      if (!user) throw new Error("User not found");

      const { createReadStream, mimetype } = await file;
      const base64Image = await streamToBase64(createReadStream(), mimetype);
      const imageUrl = await uploadBase64Image(base64Image, "avatars");

      const image = await models.Image.create({ url: imageUrl });
      await user.update({ avatarId: image.id });

      return user;
    },
  },

  User: {
    avatar: async (parent, _, { models }) => {
      return parent.avatarId
        ? await models.Image.findByPk(parent.avatarId)
        : null;
    },
    role: async (parent) => {
      return await parent.getRole();
    },
    badges: async (parent) => {
      return await parent.getBadges();
    },
    items: async (parent) => {
      return await parent.getItems();
    },
    courses: async (parent) => {
      return await parent.getCourses();
    },
  },
};

module.exports = userResolver;
