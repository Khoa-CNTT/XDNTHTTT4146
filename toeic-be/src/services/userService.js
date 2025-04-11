const { uploadBase64Image } = require("../utils/cloudinaryUploader");
const { User } = require("../models/mysql");

/**
 * Cập nhật thông tin người dùng
 * @param {string} userId - ID người dùng
 * @param {string} name - Tên mới
 * @param {string} avatarBase64 - Ảnh đại diện dưới dạng base64
 * @returns {Promise<Object>} - Thông tin người dùng sau khi cập nhật
 */
const updateUser = async (userId, name, avatarBase64) => {
  const user = await User.findByPk(userId);
  if (!user) throw new Error("❌ Không tìm thấy người dùng.");

  if (avatarBase64) {
    try {
      const imageUrl = await uploadBase64Image(avatarBase64);
      user.avatar = imageUrl;
    } catch (err) {
      console.error("❌ Upload avatar thất bại:", err.message);
      throw new Error("Không thể cập nhật ảnh đại diện.");
    }
  }

  if (name) {
    user.name = name;
  }

  await user.save();
  console.log("✅ Người dùng đã được cập nhật:", user.id);

  return user;
};

/**
 * Cập nhật riêng ảnh đại diện người dùng
 * @param {string} userId - ID người dùng
 * @param {string} base64Image - Ảnh base64
 * @returns {Promise<Object>} - Người dùng sau khi cập nhật ảnh
 */
const updateUserAvatar = async (userId, base64Image) => {
  return await updateUser(userId, null, base64Image);
};

module.exports = {
  updateUser,
  updateUserAvatar,
};
