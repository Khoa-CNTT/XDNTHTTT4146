const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Role } = require("../models");
const sendResetEmail = require("../utils/emailHelper");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const userService = {
  // Đăng ký người dùng
  register: async (data) => {
    const { email, password, username, roleId } = data;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) throw new Error("Email already exists");

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      ...data,
      password: hashedPassword,
      status: "ACTIVE",
      exp: 0,
      level: 1,
      coin: 0,
      emailVerified: false,
    });

    return newUser;
  },

  // Đăng nhập người dùng
  login: async ({ email, password }) => {
    const user = await User.findOne({ where: { email }, include: [Role] });
    if (!user) throw new Error("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return { token, user };
  },

  // Đăng nhập/Đăng ký với Google
  loginWithGoogle: async (idToken) => {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub, email, name, picture } = payload;

    // Tìm hoặc tạo user
    let user = await User.findOne({ where: { email } });

    if (!user) {
      user = await User.create({
        email,
        fullName: name,
        avatar: picture,
        loginType: "GOOGLE",
        status: "ACTIVE",
        exp: 0,
        level: 1,
        coin: 0,
        emailVerified: true,
      });
    }

    // Tạo JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return { token, user };
  },

  // Đăng xuất (nếu cần xử lý thêm thì xử lý blacklist token)
  logout: async () => {
    // Nếu bạn dùng JWT, logout thường chỉ là xóa token trên client
    return true;
  },

  // Quên mật khẩu: Gửi email chứa liên kết đặt lại mật khẩu
  forgotPassword: async (email) => {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error("User not found");

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Gửi email reset password
    await sendResetEmail(user.email, token);

    return true;
  },

  // Đặt lại mật khẩu
  resetPassword: async (token, newPassword) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    if (!user) throw new Error("Invalid token");

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await user.update({ password: hashedPassword });

    return true;
  },

  // Cập nhật hồ sơ người dùng
  updateProfile: async (id, data) => {
    const user = await User.findByPk(id);
    if (!user) throw new Error("User not found");

    await user.update(data);
    return user;
  },

  // Lấy thông tin người dùng theo ID
  getUserById: async (id) => {
    const user = await User.findByPk(id, {
      include: [{ model: Role }],
    });
    if (!user) throw new Error("User not found");

    return user;
  },

  // Lấy danh sách người dùng với phân trang
  getUsers: async (limit = 10, offset = 0) => {
    return await User.findAll({
      include: [{ model: Role }],
      limit,
      offset,
    });
  },

  // Cập nhật thông tin người dùng
  updateUser: async (id, data) => {
    const user = await User.findByPk(id);
    if (!user) throw new Error("User not found");

    await user.update(data);
    return await User.findByPk(id, {
      include: [{ model: Role }],
    });
  },

  // Xóa người dùng
  deleteUser: async (id) => {
    const user = await User.findByPk(id);
    if (!user) throw new Error("User not found");

    await user.destroy();
    return true;
  },
};

module.exports = userService;
