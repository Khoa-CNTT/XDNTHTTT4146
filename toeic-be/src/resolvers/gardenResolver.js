const GardenService = require("../services/gardenService");

const gardenResolvers = {
  Query: {
    getAllGardens: async () => {
      return await GardenService.getAllGardens();
    },
    getGarden: async (_, { id }) => {
      return await GardenService.getGardenById(id);
    },
  },
  Mutation: {
    createGarden: async (_, args) => {
      return await GardenService.createGarden(args);
    },
    updateGarden: async (_, { id, ...updates }) => {
      return await GardenService.updateGarden(id, updates);
    },
    deleteGarden: async (_, { id }) => {
      return await GardenService.deleteGarden(id);
    },
  },
};

module.exports = gardenResolvers;
