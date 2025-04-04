//  Kiểm tra token JWT
const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server-express");

const authMiddleware = (req) => {
  const authHeader = req.headers.authorization || "";
  if (!authHeader.startsWith("Bearer ")) {
    console.warn("No token provided in Authorization header");
    throw new AuthenticationError("Access denied. Token missing.");
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    console.error("Invalid token:", err.message);
    throw new AuthenticationError("Access denied. Invalid token.");
  }
};

module.exports = authMiddleware;
