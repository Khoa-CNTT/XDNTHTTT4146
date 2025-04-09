const cloudinary = require("../config/cloudinary");

const uploadBase64Image = async (base64Image, folderName = "avatars") => {
  try {
    const result = await cloudinary.uploader.upload(base64Image, {
      folder: folderName,
    });
    return result.secure_url;
  } catch (err) {
    console.error("Error uploading base64 image:", err);
    throw new Error("Upload failed");
  }
};

module.exports = { uploadBase64Image };
