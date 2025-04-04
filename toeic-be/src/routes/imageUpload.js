const express = require("express");
const cloudinary = require("../config/cloudinary");
const multer = require("multer");
const path = require("path");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "your-folder", // Tùy chọn: Thư mục trên Cloudinary
      resource_type: "image", // Loại tài nguyên (hình ảnh)
    });

    res.json({
      message: "Image uploaded successfully",
      url: result.secure_url, // URL an toàn của hình ảnh trên Cloudinary
    });
  } catch (error) {
    console.error("Error uploading image: ", error);
    res.status(500).json({ message: "Error uploading image", error });
  }
});

module.exports = router;
