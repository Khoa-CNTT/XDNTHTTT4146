require("dotenv").config();
require("./config/passport-config");

const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const initDatabase = require("./config/initDatabase"); // <<== Thêm dòng này
const { createApolloServer } = require("./config/graphql");
const errorHandler = require("./middlewares/errorHandler");
const imageUploadRouter = require("./routes/imageUpload");

const app = express();

// CORS cho frontend
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

// Cấu hình session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

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
    const token = req.user; // Đây là user object bạn gán từ Passport
    res.redirect(`http://localhost:5173/auth/callback?token=${token.id}`);
  }
);

// Middleware
app.use(express.json());
app.use("/api", imageUploadRouter);
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
