const Item = require("../models/mysql/Item");
const Image = require("../models/mysql/Image"); // nếu dùng mối quan hệ images
const { Op } = require("sequelize");

const itemResolver = {
  Query: {
    getAllItems: async (_, { activeOnly }) => {
      const where = activeOnly ? { isActive: true } : {};
      return await Item.findAll({ where });
    },

    getItemById: async (_, { id }) => {
      return await Item.findByPk(id, {
        include: [
          {
            model: Image,
            where: { type: "item" },
            required: false,
          },
        ],
      });
    },

    getItemsByRarity: async (_, { rarity }) => {
      return await Item.findAll({ where: { rarity } });
    },

    getItemsByCategory: async (_, { category }) => {
      return await Item.findAll({ where: { category } });
    },
  },

  Mutation: {
    createItem: async (_, { input }) => {
      try {
        const newItem = await Item.create(input);
        return {
          success: true,
          message: "Item created successfully",
          item: newItem,
        };
      } catch (error) {
        return {
          success: false,
          message: error.message,
          item: null,
        };
      }
    },

    updateItem: async (_, { id, input }) => {
      try {
        const item = await Item.findByPk(id);
        if (!item)
          return {
            success: false,
            message: "Item not found",
            item: null,
          };

        await item.update(input);
        return {
          success: true,
          message: "Item updated successfully",
          item,
        };
      } catch (error) {
        return {
          success: false,
          message: error.message,
          item: null,
        };
      }
    },

    deleteItem: async (_, { id }) => {
      try {
        const item = await Item.findByPk(id);
        if (!item)
          return {
            success: false,
            message: "Item not found",
            item: null,
          };

        await item.destroy();
        return {
          success: true,
          message: "Item deleted successfully",
          item,
        };
      } catch (error) {
        return {
          success: false,
          message: error.message,
          item: null,
        };
      }
    },
  },

  // Nếu bạn có quan hệ 1-n giữa Item và Image trong Sequelize:
  Item: {
    images: async (parent) => {
      return await Image.findAll({
        where: {
          refId: parent.id,
          type: "item",
        },
        order: [["priority", "ASC"]],
      });
    },
  },
};

module.exports = itemResolver;
