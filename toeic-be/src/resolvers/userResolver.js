const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/mysql");
const SECRET_KEY = process.env.SECRET_KEY;

const userResolver = {
  Query: {
    getCurrentUser: (_, __, { user }) => {
      if (!user) throw new Error("Not authenticated");
      return user;
    },
  },
  Mutation: {
    register: async (_, { username, email, password }) => {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) throw new Error("Email is already in use");

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
      });

      const token = jwt.sign({ id: newUser.id, email }, SECRET_KEY, {
        expiresIn: "7d",
      });

      return { ...newUser.toJSON(), token };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ where: { email } });
      if (!user) throw new Error("User not found");

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error("Invalid credentials");

      const token = jwt.sign({ id: user.id, email }, SECRET_KEY, {
        expiresIn: "7d",
      });

      return { ...user.toJSON(), token };
    },
  },
};

module.exports = userResolver;
