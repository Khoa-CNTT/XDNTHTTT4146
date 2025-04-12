const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cloudinary = require("../config/cloudinary");
const ImageService = require("../services/imageService");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // tối đa 5MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimeType = allowedTypes.test(file.mimetype);

    if (extname && mimeType) {
      cb(null, true);
    } else {
      cb("Only image files are allowed (jpg, png, gif)");
    }
  },
});

router.post("/upload-image", upload.single("image"), async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: "No image file uploaded." });

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "images-toeic",
    });

    fs.unlinkSync(req.file.path);

    const image = await ImageService.createImage({ url: result.secure_url });

    res.json({
      message: "Image uploaded successfully",
      url: result.secure_url,
      imageId: image.id,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ message: "Error uploading image", error });
  }
});

module.exports = router;
