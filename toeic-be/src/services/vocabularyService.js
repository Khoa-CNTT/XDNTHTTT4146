const { Vocabulary } = require("../../models/mysql");

class VocabularyService {
  static async createVocabulary(input) {
    try {
      const vocabulary = await Vocabulary.create(input);
      return vocabulary;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getVocabularyById(id) {
    try {
      return await Vocabulary.findByPk(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getAllVocabularies() {
    try {
      return await Vocabulary.findAll();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async updateVocabulary(id, input) {
    try {
      const vocabulary = await Vocabulary.findByPk(id);
      if (!vocabulary) {
        throw new Error("Vocabulary not found");
      }
      await vocabulary.update(input);
      return vocabulary;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async deleteVocabulary(id) {
    try {
      const vocabulary = await Vocabulary.findByPk(id);
      if (!vocabulary) {
        throw new Error("Vocabulary not found");
      }
      await vocabulary.destroy();
      return true;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = VocabularyService;
