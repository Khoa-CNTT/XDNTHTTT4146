const { Item, User, Land, Garden } = require("../models");
const sequelize = require("../config/mysql");

class ItemService {
  static async useItem(userId, itemId) {
    const transaction = await sequelize.transaction();
    try {
      const item = await Item.findByPk(itemId, { transaction });
      if (!item || item.status !== "ACTIVE") {
        throw new Error("Vật phẩm không hợp lệ hoặc không thể sử dụng.");
      }

      const user = await User.findByPk(userId, { transaction });
      if (!user) {
        throw new Error("Người dùng không tồn tại.");
      }

      const garden = await Garden.findOne({
        where: { userId },
        transaction,
      });
      if (!garden) {
        throw new Error("Vườn không tồn tại.");
      }

      let land; // Khai báo ngoài switch để dùng sau

      switch (item.effectType) {
        case "XP":
          user.xp += item.effectValue;
          break;

        case "TIME":
          const lands = await Land.findAll({
            where: { gardenId: garden.id },
            transaction,
          });
          lands.forEach((l) => {
            if (l.lastPlantedAt) {
              l.lastPlantedAt = new Date(
                l.lastPlantedAt.getTime() - item.effectValue
              );
            }
          });
          await Promise.all(lands.map((l) => l.save({ transaction })));
          break;

        case "FERTILITY":
          land = await Land.findOne({
            where: { gardenId: garden.id },
            transaction,
          });
          if (land) {
            land.fertility = Math.min(land.fertility + item.effectValue, 100);
          }
          break;

        default:
          throw new Error("Loại hiệu ứng không hợp lệ.");
      }

      await user.save({ transaction });
      if (land) await land.save({ transaction });

      await item.update({ status: "DELETED" }, { transaction });
      await transaction.commit();

      return { message: "Vật phẩm đã được sử dụng thành công." };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  static async validateItemUsage(userId, itemId) {
    const item = await Item.findByPk(itemId);
    if (!item || item.status !== "ACTIVE") {
      throw new Error("Vật phẩm không hợp lệ hoặc không thể sử dụng.");
    }

    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("Người dùng không tồn tại.");
    }

    return { item, user };
  }
}

module.exports = ItemService;
