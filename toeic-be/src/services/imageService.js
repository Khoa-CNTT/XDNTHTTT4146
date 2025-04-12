const { Image } = require("../models/mysql");
const cloudinary = require("../config/cloudinary");

const createImage = async (data) => {
  const image = await Image.create(data);
  return image;
};

const updateImage = async (id, data) => {
  const image = await Image.findByPk(id);
  if (!image) throw new Error("Image not found");
  await image.update(data);
  return image;
};

const deleteImage = async (id) => {
  const image = await Image.findByPk(id);
  if (!image) throw new Error("Image not found");
  await image.destroy();
  return image;
};

const getImageById = async (id) => {
  return await Image.findByPk(id);
};

const getImagesByTypeAndRef = async (type, refId) => {
  return await Image.findAll({ where: { type, refId } });
};

const getImagesByTag = async (tag) => {
  return await Image.findAll({ where: { tag } });
};

const uploadImageToCloudinary = async (file, type, refId) => {
  const { createReadStream, filename, mimetype } = await file;
  const stream = createReadStream();

  const uploadResult = await cloudinary.uploadFromStream(stream);

  const image = await Image.create({
    url: uploadResult.secure_url,
    type,
    refId,
    name: filename,
    metadata: uploadResult,
  });

  return image;
};

const deleteImageFromCloudinary = async (publicId) => {
  const result = await cloudinary.deleteFromCloudinary(publicId);
  return result;
};

module.exports = {
  createImage,
  updateImage,
  deleteImage,
  getImageById,
  getImagesByTypeAndRef,
  getImagesByTag,
  uploadImageToCloudinary,
  deleteImageFromCloudinary,
};
