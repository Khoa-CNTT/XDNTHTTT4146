// Cấu hình Apollo Server
const { ApolloServer } = require("apollo-server-express");
const { typeDefs } = require("../schema");
const { resolvers } = require("../resolvers");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

// Hàm xác thực người dùng từ JWT
const getUserFromToken = (token) => {
  try {
    if (!token) return null;
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return null;
  }
};

const createApolloServer = () => {
  return new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const token = req.headers.authorization || "";
      const user = getUserFromToken(token.replace("Bearer ", ""));
      return { user };
    },
    introspection: true,
    playground: true,
  });
};

module.exports = { createApolloServer };
