const { GraphQLError } = require("graphql");
const userService = require("../services/userService");

const userResolver = {
  Query: {
    // Lấy thông tin người dùng theo ID
    getUser: async (parent, { userId }, context) => {
      try {
        // Kiểm tra nếu người dùng đã đăng nhập
        if (!context.userId || context.userId !== userId) {
          throw new GraphQLError("Unauthorized", {
            extensions: { code: "UNAUTHORIZED" },
          });
        }

        const user = await userService.getUserById(userId);
        if (!user) {
          throw new GraphQLError("User not found", {
            extensions: { code: "NOT_FOUND" },
          });
        }

        return user;
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: { code: "INTERNAL_SERVER_ERROR" },
        });
      }
    },

    // Kiểm tra email đã tồn tại chưa
    checkEmailExistence: async (parent, { email }) => {
      try {
        const exists = await userService.checkEmailExistence(email);
        return exists;
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: { code: "INTERNAL_SERVER_ERROR" },
        });
      }
    },
  },

  Mutation: {
    // Đăng ký người dùng mới
    registerUser: async (parent, { name, email, password }) => {
      try {
        const user = await userService.registerUser(name, email, password);
        return {
          status: true,
          msg: "User registered successfully",
          user,
        };
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: { code: "INTERNAL_SERVER_ERROR" },
        });
      }
    },

    // Đăng nhập người dùng
    loginUser: async (parent, { email, password }) => {
      try {
        const user = await userService.loginUser(email, password);
        return {
          status: true,
          msg: "Login successful",
          user,
        };
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: { code: "INTERNAL_SERVER_ERROR" },
        });
      }
    },

    // Cập nhật avatar người dùng
    updateUserAvatar: async (parent, { userId, base64Image }, context) => {
      try {
        // Kiểm tra quyền truy cập
        if (!context.userId || context.userId !== userId) {
          throw new GraphQLError("Unauthorized", {
            extensions: { code: "UNAUTHORIZED" },
          });
        }

        const result = await userService.updateUserAvatar(userId, base64Image);
        return result;
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: { code: "INTERNAL_SERVER_ERROR" },
        });
      }
    },

    // Cập nhật thông tin người dùng
    updateUserProfile: async (parent, { userId, name, avatar }, context) => {
      try {
        // Kiểm tra quyền truy cập
        if (!context.userId || context.userId !== userId) {
          throw new GraphQLError("Unauthorized", {
            extensions: { code: "UNAUTHORIZED" },
          });
        }

        const result = await userService.updateUserProfile(
          userId,
          name,
          avatar
        );
        return result;
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: { code: "INTERNAL_SERVER_ERROR" },
        });
      }
    },

    // Đổi mật khẩu người dùng
    changeUserPassword: async (
      parent,
      { userId, currentPassword, newPassword },
      context
    ) => {
      try {
        // Kiểm tra quyền truy cập
        if (!context.userId || context.userId !== userId) {
          throw new GraphQLError("Unauthorized", {
            extensions: { code: "UNAUTHORIZED" },
          });
        }

        const result = await userService.changeUserPassword(
          userId,
          currentPassword,
          newPassword
        );
        return result;
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: { code: "INTERNAL_SERVER_ERROR" },
        });
      }
    },

    // Khóa tài khoản người dùng
    lockUserAccount: async (parent, { userId }, context) => {
      try {
        // Kiểm tra quyền truy cập
        if (!context.userId || context.userId !== userId) {
          throw new GraphQLError("Unauthorized", {
            extensions: { code: "UNAUTHORIZED" },
          });
        }

        const result = await userService.lockUserAccount(userId);
        return result;
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: { code: "INTERNAL_SERVER_ERROR" },
        });
      }
    },

    // Mở khóa tài khoản người dùng
    unlockUserAccount: async (parent, { userId }, context) => {
      try {
        // Kiểm tra quyền truy cập
        if (!context.userId || context.userId !== userId) {
          throw new GraphQLError("Unauthorized", {
            extensions: { code: "UNAUTHORIZED" },
          });
        }

        const result = await userService.unlockUserAccount(userId);
        return result;
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: { code: "INTERNAL_SERVER_ERROR" },
        });
      }
    },

    // Xóa người dùng
    deleteUser: async (parent, { userId }, context) => {
      try {
        // Kiểm tra quyền truy cập
        if (!context.userId || context.userId !== userId) {
          throw new GraphQLError("Unauthorized", {
            extensions: { code: "UNAUTHORIZED" },
          });
        }

        const result = await userService.deleteUser(userId);
        return result;
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: { code: "INTERNAL_SERVER_ERROR" },
        });
      }
    },
  },
};

module.exports = userResolver;
