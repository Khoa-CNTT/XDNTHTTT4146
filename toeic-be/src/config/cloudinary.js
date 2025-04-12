const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

dotenv.config();

if (
  !process.env.CLOUDINARY_CLOUD_NAME ||
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_API_SECRET
) {
  console.warn("[Cloudinary] ❌ Missing environment variables.");
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

if (process.env.NODE_ENV !== "production") {
  console.log(
    "[Cloudinary] ✅ Configured for",
    process.env.CLOUDINARY_CLOUD_NAME
  );
}

module.exports = cloudinary;
