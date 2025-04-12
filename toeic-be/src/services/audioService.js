const { Audio } = require("../models");

class AudioService {
  static async createAudio({ url }) {
    return await Audio.create({ url });
  }

  static async getAllAudios() {
    return await Audio.findAll();
  }
}

module.exports = AudioService;
