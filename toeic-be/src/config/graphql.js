const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const cors = require("cors");
const { typeDefs } = require("../schema/schema");
const { resolvers } = require("../resolvers/resolver");
const { getUserFromToken } = require("../utils/jwtHelper");
const errorHandler = require("../middlewares/errorHandler");

const createApolloServer = async () => {
  try {
    const app = express();

    app.use(
      cors({
        origin: "http://localhost:5173",
        credentials: true,
      })
    );

    app.use(express.json());
    app.use(errorHandler);

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req, res }) => {
        const authHeader = req.headers.authorization;
        const token =
          authHeader && authHeader.startsWith("Bearer ")
            ? authHeader.slice(7)
            : null;
        const user = getUserFromToken(token);
        return { req, res, user };
      },
      introspection: true,
      playground: true,
    });

    await server.start();
    server.applyMiddleware({ app, cors: false });

    return { app, server };
  } catch (error) {
    console.error("Error initializing Apollo Server:", error);
    throw error;
  }
};

module.exports = { createApolloServer };
