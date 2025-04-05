require("dotenv").config();
require("./config/passport-config");

const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const { createApolloServer } = require("./config/graphql");
const errorHandler = require("./middlewares/errorHandler");
const imageUploadRouter = require("./routes/imageUpload");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173" || "http://127.0.0.1:5173",
    credentials: true,
  })
);

// Cấu hình session
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Secret session từ .env
    resave: false,
    saveUninitialized: true,
  })
);

// Khởi tạo passport
app.use(passport.initialize());
app.use(passport.session());

// Route bắt đầu quá trình đăng nhập với Google
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Route callback của Google
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Sau khi Google login thành công, bạn có thể redirect về frontend và gửi token
    const token = req.user; // Token hoặc thông tin người dùng
    res.redirect(`http://localhost:5173/auth/callback?token=${token.id}`);
  }
);

// Cấu hình các route khác
app.use(express.json());
app.use("/api", imageUploadRouter);
app.use(errorHandler);

// Khởi động server GraphQL
const startServer = async () => {
  try {
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
