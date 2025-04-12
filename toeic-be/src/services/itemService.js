const { Item, Image } = require("../../models");

const itemService = {
  async getItemById(id) {
    return await Item.findByPk(id, {
      include: [{ model: Image, as: "images" }],
    });
  },

  async getAllItems(activeOnly = false) {
    const where = activeOnly ? { isActive: true } : {};
    return await Item.findAll({
      where,
      include: [{ model: Image, as: "images" }],
    });
  },

  async getItemsByRarity(rarity) {
    return await Item.findAll({
      where: { rarity },
      include: [{ model: Image, as: "images" }],
    });
  },

  async getItemsByCategory(category) {
    return await Item.findAll({
      where: { category },
      include: [{ model: Image, as: "images" }],
    });
  },

  async createItem(input) {
    return await Item.create(input);
  },

  async updateItem(id, input) {
    const item = await Item.findByPk(id);
    if (!item) throw new Error("Item not found");
    await item.update(input);
    return item;
  },

  async deleteItem(id) {
    const item = await Item.findByPk(id);
    if (!item) throw new Error("Item not found");
    await item.destroy();
    return true;
  },
};

module.exports = itemService;
