const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/mysql/User");
const Vocabulary = require("../models/mysql/Vocabulary");
const Game = require("../models/mysql/Game");
const Payment = require("../models/mysql/Payment");
const Mission = require("../models/mysql/Mission");
const Reward = require("../models/mysql/Reward");
const UserReward = require("../models/mysql/UserReward");
const Course = require("../models/mysql/Course");
const Enrollment = require("../models/mysql/Enrollment");
const Badge = require("../models/mysql/Badge");
const UserProgress = require("../models/mongo/UserProgress");
const { GraphQLError } = require("graphql");

const generateToken = require("../utils/jwtHelper");

const userResolvers = {
  Query: {
    // Lấy tất cả người dùng
    getUsers: async () => {
      return await User.findAll();
    },

    // Lấy thông tin người dùng hiện tại (Profile)
    profile: async (_, __, context) => {
      if (!context.user) {
        throw new GraphQLError("Not authenticated", {
          extensions: { code: "UNAUTHORIZED" },
        });
      }
      return await User.findByPk(context.user.id);
    },

    // Lấy vai trò người dùng
    getUserRole: async (_, { userId }) => {
      const user = await User.findByPk(userId, { attributes: ["role"] });
      return user ? user.role : null;
    },

    // Lấy tiến trình học từ MongoDB
    getUserProgress: async (_, { userId }) => {
      return await UserProgress.findOne({ userId });
    },

    // Lấy tiến trình game từ MongoDB
    getUserGameProgress: async (_, { userId }) => {
      return await UserProgress.findOne({ userId }, "gameProgress");
    },

    // Lấy danh sách từ vựng
    getVocabularies: async () => {
      return await Vocabulary.findAll();
    },

    // Lấy vai trò người dùng
    getUserRole: async (_, { userId }) => {
      const user = await User.findByPk(userId, { attributes: ["role"] });
      return user ? user.role : null;
    },

    // Lấy danh sách game
    getGames: async () => {
      return await Game.findAll();
    },

    // Lấy bảng xếp hạng (Leaderboard)
    getLeaderboard: async () => {
      const leaderboard = await User.findAll({
        order: [["exp", "DESC"]],
        attributes: ["id", "name", "exp"],
      });
      return leaderboard.map((user, index) => ({
        user,
        rank: index + 1,
        exp: user.exp,
      }));
    },

    // Lấy huy hiệu người dùng từ bảng UserBadge
    getUserBadges: async (_, { userId }) => {
      return await Badge.findAll({
        include: [{ model: User, where: { id: userId } }],
      });
    },

    // Lấy thông tin thanh toán của người dùng
    getPayments: async (_, { userId }) => {
      return await Payment.findAll({ where: { userId } });
    },

    // Lấy danh sách nhiệm vụ hàng ngày
    getDailyMissions: async () => {
      return await Mission.findAll();
    },

    // Lấy danh sách phần thưởng
    getRewards: async () => {
      return await Reward.findAll();
    },

    // Lấy phần thưởng của người dùng
    getUserRewards: async (_, { userId }) => {
      return await UserReward.findAll({ where: { userId } });
    },

    // Lấy danh sách khóa học của giáo viên
    getCoursesByTeacher: async (_, { teacherId }) => {
      return await Course.findAll({ where: { teacherId } });
    },

    // Lấy danh sách học viên trong khóa học (dùng bảng Enrollment)
    getStudentsInCourse: async (_, { courseId }) => {
      return await Enrollment.findAll({
        where: { courseId },
        include: [{ model: User, attributes: ["id", "name", "email"] }],
      });
    },
  },

  Mutation: {
    // Đăng ký người dùng mới
    register: async (_, { name, email, password }) => {
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
        role: "student", // Default role
        exp: 0,
        coins: 0,
      });

      return { status: true, msg: "User registered successfully!" };
    },

    // Đăng nhập người dùng
    login: async (_, { email, password }) => {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new GraphQLError("User not found", {
          extensions: { code: "NOT_FOUND" },
        });
      }

      if (user.status === "banned") {
        throw new GraphQLError("This user is banned. Access is denied.", {
          extensions: { code: "UNAUTHORIZED" },
        });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new GraphQLError("Invalid password", {
          extensions: { code: "UNAUTHORIZED" },
        });
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      return { status: true, msg: "Login successful!", token, user };
    },

    // Cập nhật tiến trình học từ MongoDB
    updateUserProgress: async (_, { userId, completedLessons, score }) => {
      const progress = await UserProgress.findOneAndUpdate(
        { userId },
        { completedLessons, score },
        { new: true, upsert: true }
      );
      return progress;
    },

    // Khóa người dùng (banned)
    lockUser: async (_, { id }) => {
      const user = await User.findByPk(id);
      if (!user) {
        throw new GraphQLError("User not found", {
          extensions: { code: "NOT_FOUND" },
        });
      }

      if (user.status === "banned") {
        return { status: false, msg: "User is already banned." };
      }

      // Cập nhật trạng thái thành "banned"
      await user.update({ status: "banned" });
      return { status: true, msg: "User has been banned successfully." };
    },

    // Mở khóa người dùng (active lại)
    unlockUser: async (_, { id }) => {
      const user = await User.findByPk(id);
      if (!user) {
        throw new GraphQLError("User not found", {
          extensions: { code: "NOT_FOUND" },
        });
      }

      if (user.status === "active") {
        return { status: false, msg: "User is already active." };
      }

      // Cập nhật trạng thái thành "active"
      await user.update({ status: "active" });
      return { status: true, msg: "User has been activated successfully." };
    },
  },
};

module.exports = userResolvers;
