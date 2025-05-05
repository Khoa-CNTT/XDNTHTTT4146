require("dotenv").config();
require("./config/passport-config");

const express = require("express");
const passport = require("passport");
const http = require("http");
const socketIo = require("socket.io");
const { createApolloServer } = require("./config/graphql");
const initDatabase = require("./config/initDatabase");
const configureMiddleware = require("./middlewares/expressMiddleware");
const errorHandler = require("./middlewares/errorHandler");
const imageUploadRouter = require("./routes/upload-image");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

configureMiddleware(app);

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    const token = req.user;
    res.redirect(`http://localhost:5173/auth/callback?token=${token.id}`);
  }
);

app.use("/api", imageUploadRouter);

app.use(errorHandler);

const startServer = async () => {
  try {
    await initDatabase();

    const { server: apolloServer } = await createApolloServer(app, io);

    const PORT = process.env.PORT || 4000;
    server.listen(PORT, () => {
      console.log(
        `🚀 GraphQL Playground available at http://localhost:${PORT}${apolloServer.graphqlPath}`
      );
    });
  } catch (error) {
    console.error("❌ Error initializing server:", error);
    process.exit(1);
  }
};

startServer();
