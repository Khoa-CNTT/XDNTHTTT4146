const { uploadBase64Image } = require("../utils/cloudinaryUploader");

const updateUser = async (userId, name, avatarBase64) => {
  const user = await User.findByPk(userId);
  if (!user) throw new Error("User not found");

  if (avatarBase64) {
    const imageUrl = await uploadBase64Image(avatarBase64);
    user.avatar = imageUrl;
  }

  if (name) user.name = name;
  await user.save();

  return user;
};

const updateUserAvatar = async (userId, base64Image) => {
  const user = await User.findByPk(userId);
  if (!user) throw new Error("User not found");

  const imageUrl = await uploadBase64Image(base64Image);
  user.avatar = imageUrl;
  await user.save();

  return user;
};
