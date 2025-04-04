const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const { typeDefs } = require("../schema/schema");
const { resolvers } = require("../resolvers/resolvers");
const { getUserFromToken } = require("../utils/jwtHelper");
const errorHandler = require("../middlewares/errorHandler");

const createApolloServer = async () => {
  try {
    const app = express();

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req }) => {
        const authHeader = req.headers.authorization;
        const token =
          authHeader && authHeader.startsWith("Bearer ")
            ? authHeader.slice(7)
            : null;
        const user = getUserFromToken(token);
        return { user };
      },
      introspection: true,
      playground: true,
    });

    await server.start();

    server.applyMiddleware({ app });

    return { app, server };
  } catch (error) {
    console.error("Error initializing Apollo Server:", error);
    throw error;
  }
};

module.exports = { createApolloServer };
