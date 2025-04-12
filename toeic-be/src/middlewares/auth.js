const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server-express");

const authMiddleware = (req) => {
  const authHeader =
    req.headers.authorization || req.headers.Authorization || "";

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.warn("[AUTH] No valid Bearer token found.");
    throw new AuthenticationError("Truy cập bị từ chối: Thiếu token xác thực.");
  }

  const token = authHeader.split(" ")[1].trim();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return decoded;
  } catch (err) {
    console.error("[AUTH] Token không hợp lệ:", err.message);
    throw new AuthenticationError("Token không hợp lệ hoặc đã hết hạn.");
  }
};

module.exports = authMiddleware;
