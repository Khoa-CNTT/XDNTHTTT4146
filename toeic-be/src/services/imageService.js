const { Image } = require("../models");

class ImageService {
  static async createImage({ url }) {
    return await Image.create({ url });
  }
}

module.exports = ImageService;
