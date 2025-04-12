const itemService = require("../../services/itemService");

const itemResolver = {
  Query: {
    getItemById: async (_, { id }) => {
      return await itemService.getItemById(id);
    },
    getAllItems: async (_, { activeOnly }) => {
      return await itemService.getAllItems(activeOnly);
    },
    getItemsByRarity: async (_, { rarity }) => {
      return await itemService.getItemsByRarity(rarity);
    },
    getItemsByCategory: async (_, { category }) => {
      return await itemService.getItemsByCategory(category);
    },
  },

  Mutation: {
    createItem: async (_, { input }) => {
      const item = await itemService.createItem(input);
      return {
        success: true,
        message: "Item created successfully",
        item,
      };
    },

    updateItem: async (_, { id, input }) => {
      const item = await itemService.updateItem(id, input);
      return {
        success: true,
        message: "Item updated successfully",
        item,
      };
    },

    deleteItem: async (_, { id }) => {
      await itemService.deleteItem(id);
      return {
        success: true,
        message: "Item deleted successfully",
        item: null,
      };
    },
  },

  Item: {
    images: async (parent) => {
      return parent.images || [];
    },
  },
};

module.exports = itemResolver;
