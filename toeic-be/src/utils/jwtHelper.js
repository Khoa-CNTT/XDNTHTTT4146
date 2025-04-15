const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET;

if (!SECRET_KEY) {
  throw new Error("JWT_SECRET is missing in .env");
}

/**
 * Tạo JWT token từ thông tin user
 * @param {object} user
 * @returns {string} JWT token
 */
const generateJwtToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    name: `${user.firstName} ${user.lastName}`.trim(),
  };

  const options = {
    expiresIn: "7d",
    issuer: "toeic-platform",
  };

  return jwt.sign(payload, SECRET_KEY, options);
};

module.exports = { generateJwtToken };
