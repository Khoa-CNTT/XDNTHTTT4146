require("dotenv").config();
require("./config/passport-config");

const express = require("express");
const passport = require("passport");
const { createApolloServer } = require("./config/graphql");
const configureMiddleware = require("./middlewares/expressMiddleware");
const errorHandler = require("./middlewares/errorHandler");
const imageUploadRouter = require("./routes/upload-image");

const app = express();

// Cấu hình middleware tách riêng
configureMiddleware(app);

// Google Auth routes
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

// API routes
app.use("/api", imageUploadRouter);

// Middleware xử lý lỗi
app.use(errorHandler);

// Khởi động server
const startServer = async () => {
  try {
    await initDatabase();

    const { app: apolloApp, server } = await createApolloServer(app);

    const PORT = process.env.PORT || 4000;
    apolloApp.listen(PORT, () => {
      console.log(
        `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  } catch (error) {
    console.error("❌ Error initializing server:", error);
    process.exit(1);
  }
};

startServer();
