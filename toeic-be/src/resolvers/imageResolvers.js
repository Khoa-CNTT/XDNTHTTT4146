const cloudinary = require("cloudinary").v2;
const { Image } = require("../../models");

const imageResolvers = {
  Query: {
    getImageById: async (_, { id }) => {
      return await Image.findByPk(id);
    },

    getImagesByTypeAndRef: async (_, { type, refId }) => {
      return await Image.findAll({
        where: { type, refId },
        order: [
          ["priority", "ASC"],
          ["createdAt", "DESC"],
        ],
      });
    },

    getImagesByTag: async (_, { tag }) => {
      return await Image.findAll({
        where: { tag },
        order: [
          ["priority", "ASC"],
          ["createdAt", "DESC"],
        ],
      });
    },
  },

  Mutation: {
    createImage: async (_, { input }) => {
      try {
        const image = await Image.create(input);
        return {
          success: true,
          message: "Image created successfully",
          image,
        };
      } catch (error) {
        return {
          success: false,
          message: error.message,
          image: null,
        };
      }
    },

    updateImage: async (_, { id, input }) => {
      try {
        const image = await Image.findByPk(id);
        if (!image) {
          return {
            success: false,
            message: "Image not found",
            image: null,
          };
        }

        await image.update(input);

        return {
          success: true,
          message: "Image updated successfully",
          image,
        };
      } catch (error) {
        return {
          success: false,
          message: error.message,
          image: null,
        };
      }
    },

    deleteImage: async (_, { id }) => {
      try {
        const image = await Image.findByPk(id);
        if (!image) {
          return {
            success: false,
            message: "Image not found",
            image: null,
          };
        }

        await image.destroy();

        return {
          success: true,
          message: "Image deleted successfully",
          image,
        };
      } catch (error) {
        return {
          success: false,
          message: error.message,
          image: null,
        };
      }
    },

    uploadImage: async (_, { input }) => {
      try {
        const { base64Image, type, refId, name, tag, priority, metadata } =
          input;

        const uploaded = await cloudinary.uploader.upload(base64Image, {
          folder: `toeic_images/${type}`,
          resource_type: "image",
        });

        const image = await Image.create({
          url: uploaded.secure_url,
          type,
          refId,
          name: name || uploaded.original_filename,
          tag,
          priority: priority || 0,
          metadata: {
            ...metadata,
            publicId: uploaded.public_id,
            width: uploaded.width,
            height: uploaded.height,
            format: uploaded.format,
            bytes: uploaded.bytes,
          },
        });

        return {
          success: true,
          message: "Image uploaded successfully",
          image,
        };
      } catch (error) {
        return {
          success: false,
          message: error.message,
          image: null,
        };
      }
    },
  },
};

module.exports = { resolvers: imageResolvers };
