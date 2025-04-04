const express = require("express");
const cloudinary = require("../config/cloudinary");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Cấu hình lưu trữ tạm thời cho multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Thư mục lưu trữ tạm thời trên server
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Tạo tên tệp duy nhất
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // Giới hạn dung lượng file (10MB cho file âm thanh)
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /mp3|wav/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimeType = allowedTypes.test(file.mimetype);

    if (extname && mimeType) {
      return cb(null, true); // File hợp lệ
    } else {
      cb("Error: Only audio files (mp3, wav) are allowed.");
    }
  },
});

router.post("/upload-audio", upload.single("audio"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No audio file uploaded." });
    }

    // Upload lên Cloudinary với resource_type là "video" vì Cloudinary không có loại "audio" riêng biệt
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "audio-toeic", // Tên thư mục trên Cloudinary
      resource_type: "video", // Cloudinary xử lý âm thanh như video
    });

    // Xóa tệp tạm thời sau khi upload lên Cloudinary
    const fs = require("fs");
    fs.unlinkSync(req.file.path);

    // Trả về URL của âm thanh đã được upload
    res.json({
      message: "Audio uploaded successfully",
      url: result.secure_url, // URL an toàn của âm thanh trên Cloudinary
    });
  } catch (error) {
    console.error("Error uploading audio: ", error);
    res.status(500).json({ message: "Error uploading audio", error });
  }
});

module.exports = router;
