const { Vocabulary } = require("../../models/mysql");

const resolvers = {
  Query: {
    async getVocabulary(_, { id }) {
      try {
        return await Vocabulary.findByPk(id);
      } catch (error) {
        throw new Error(error.message);
      }
    },

    async getAllVocabularies() {
      try {
        return await Vocabulary.findAll();
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },

  Mutation: {
    async createVocabulary(_, { input }) {
      try {
        const vocabulary = await Vocabulary.create(input);
        return vocabulary;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    async updateVocabulary(_, { id, input }) {
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
    },

    async deleteVocabulary(_, { id }) {
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
    },
  },
};

module.exports = { resolvers };
