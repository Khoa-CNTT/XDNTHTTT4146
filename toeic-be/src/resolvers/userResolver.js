const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { GraphQLError } = require("graphql");

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
const generateToken = require("../utils/jwtHelper");

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const userResolvers = {
  Query: {
    getUsers: async () => await User.findAll(),

    profile: async (_, __, context) => {
      if (!context.user) {
        throw new GraphQLError("Not authenticated", {
          extensions: { code: "UNAUTHORIZED" },
        });
      }
      return await User.findByPk(context.user.id);
    },

    getUserRole: async (_, { userId }) => {
      const user = await User.findByPk(userId, { attributes: ["role"] });
      return user ? user.role : null;
    },

    getUserProgress: async (_, { userId }) => {
      return await UserProgress.findOne({ userId });
    },

    getUserGameProgress: async (_, { userId }) => {
      return await UserProgress.findOne({ userId }, "gameProgress");
    },

    getVocabularies: async () => await Vocabulary.findAll(),

    getGames: async () => await Game.findAll(),

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

    getUserBadges: async (_, { userId }) => {
      return await Badge.findAll({
        include: [{ model: User, where: { id: userId } }],
      });
    },

    getPayments: async (_, { userId }) => {
      return await Payment.findAll({ where: { userId } });
    },

    getDailyMissions: async () => await Mission.findAll(),

    getRewards: async () => await Reward.findAll(),

    getUserRewards: async (_, { userId }) => {
      return await UserReward.findAll({ where: { userId } });
    },

    getCoursesByTeacher: async (_, { teacherId }) => {
      return await Course.findAll({ where: { teacherId } });
    },

    getStudentsInCourse: async (_, { courseId }) => {
      return await Enrollment.findAll({
        where: { courseId },
        include: [{ model: User, attributes: ["id", "name", "email"] }],
      });
    },
  },

  Mutation: {
    googleLogin: async (_, { idToken }) => {
      try {
        const ticket = await client.verifyIdToken({
          idToken,
          audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const { email, name } = payload;

        let user = await User.findOne({ where: { email } });
        if (!user) {
          user = await User.create({
            email,
            name,
            password: "",
            role: "student",
            status: "active",
            exp: 0,
            coins: 0,
          });
        }

        const token = jwt.sign(
          { userId: user.id, email: user.email, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );

        return {
          status: true,
          msg: "Login with Google successful",
          token,
          user,
        };
      } catch (error) {
        throw new GraphQLError("Google login failed", {
          extensions: { code: "UNAUTHORIZED" },
        });
      }
    },

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
        role: "student",
        exp: 0,
        coins: 0,
      });

      return { status: true, msg: "User registered successfully!" };
    },

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

    updateUserProgress: async (_, { userId, completedLessons, score }) => {
      const progress = await UserProgress.findOneAndUpdate(
        { userId },
        { completedLessons, score },
        { new: true, upsert: true }
      );
      return progress;
    },

    lockUser: async (_, { id }) => {
      const user = await User.findByPk(id);
      if (!user)
        throw new GraphQLError("User not found", {
          extensions: { code: "NOT_FOUND" },
        });

      if (user.status === "banned") {
        return { status: false, msg: "User is already banned." };
      }

      await user.update({ status: "banned" });
      return { status: true, msg: "User has been banned successfully." };
    },

    unlockUser: async (_, { id }) => {
      const user = await User.findByPk(id);
      if (!user)
        throw new GraphQLError("User not found", {
          extensions: { code: "NOT_FOUND" },
        });

      if (user.status === "active") {
        return { status: false, msg: "User is already active." };
      }

      await user.update({ status: "active" });
      return { status: true, msg: "User has been activated successfully." };
    },

    updateProfile: async (_, { id, name, avatar }, context) => {
      if (!context.user || context.user.id !== id) {
        throw new GraphQLError("Unauthorized", {
          extensions: { code: "UNAUTHORIZED" },
        });
      }

      const user = await User.findByPk(id);
      if (!user)
        throw new GraphQLError("User not found", {
          extensions: { code: "NOT_FOUND" },
        });

      await user.update({ name, avatar });
      return { status: true, msg: "Profile updated successfully.", user };
    },

    changePassword: async (_, { currentPassword, newPassword }, context) => {
      if (!context.user) {
        throw new GraphQLError("Unauthorized", {
          extensions: { code: "UNAUTHORIZED" },
        });
      }

      const user = await User.findByPk(context.user.id);
      if (!user) throw new GraphQLError("User not found");

      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) throw new GraphQLError("Current password is incorrect");

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      await user.update({ password: hashedNewPassword });

      return { status: true, msg: "Password changed successfully." };
    },

    deleteUser: async (_, { id }, context) => {
      if (!context.user || context.user.role !== "admin") {
        throw new GraphQLError("Only admin can delete users", {
          extensions: { code: "FORBIDDEN" },
        });
      }

      const user = await User.findByPk(id);
      if (!user) throw new GraphQLError("User not found");

      await user.update({ status: "deleted" });

      return { status: true, msg: "User deleted (soft) successfully." };
    },

    logout: async (_, __, context) => {
      if (!context.user) {
        throw new GraphQLError("Unauthorized", {
          extensions: { code: "UNAUTHORIZED" },
        });
      }

      return { status: true, msg: "Logout successful!" };
    },
  },
};

module.exports = userResolvers;
