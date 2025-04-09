const cloudinary = require("cloudinary").v2;
const { Image } = require("../../models");
const { cloudinary } = require("../../config/cloudinary");

const imageResolvers = {
  Query: {
    imagesByVocabulary: async (_, { vocabularyId }) => {
      return await Image.findAll({ where: { vocabularyId } });
    },
  },

  Mutation: {
    uploadImage: async (_, { input }) => {
      const { vocabularyId, base64Image } = input;

      const uploaded = await cloudinary.uploader.upload(base64Image, {
        folder: "toeic_vocab_images",
        resource_type: "image",
      });

      const image = await Image.create({
        vocabularyId,
        url: uploaded.secure_url,
      });

      return image;
    },
  },
};

module.exports = { resolvers: imageResolvers };
