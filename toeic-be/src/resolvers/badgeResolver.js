const BadgeService = require("../services/badgeService");

module.exports = {
  Query: {
    badges: async (_, { includeDeleted = false }, { models }) => {
      const service = new BadgeService(models);
      return await service.getAll(includeDeleted);
    },

    badge: async (_, { id }, { models }) => {
      const service = new BadgeService(models);
      return await service.getById(id);
    },

    deletedBadges: async (_, __, { models }) => {
      const service = new BadgeService(models);
      return await service.getDeleted();
    },
  },

  Mutation: {
    createBadge: async (_, { input }, { models }) => {
      const service = new BadgeService(models);
      try {
        const badge = await service.create(input);
        return {
          success: true,
          message: "Tạo huy hiệu thành công",
          badge,
        };
      } catch (error) {
        return {
          success: false,
          message: `Lỗi tạo huy hiệu: ${error.message}`,
          badge: null,
        };
      }
    },

    updateBadge: async (_, { id, input }, { models }) => {
      const service = new BadgeService(models);
      try {
        const badge = await service.update(id, input);
        return {
          success: true,
          message: "Cập nhật huy hiệu thành công",
          badge,
        };
      } catch (error) {
        return {
          success: false,
          message: `Lỗi cập nhật: ${error.message}`,
          badge: null,
        };
      }
    },

    deleteBadge: async (_, { id }, { models }) => {
      const service = new BadgeService(models);
      try {
        const badge = await service.softDelete(id);
        return {
          success: true,
          message: "Đã xoá huy hiệu (soft delete)",
          badge,
        };
      } catch (error) {
        return {
          success: false,
          message: `Lỗi xoá huy hiệu: ${error.message}`,
          badge: null,
        };
      }
    },

    restoreBadge: async (_, { id }, { models }) => {
      const service = new BadgeService(models);
      try {
        const badge = await service.restore(id);
        return {
          success: true,
          message: "Khôi phục huy hiệu thành công",
          badge,
        };
      } catch (error) {
        return {
          success: false,
          message: `Lỗi khôi phục: ${error.message}`,
          badge: null,
        };
      }
    },

    forceDeleteBadge: async (_, { id }, { models }) => {
      const service = new BadgeService(models);
      try {
        await service.forceDelete(id);
        return {
          success: true,
          message: "Đã xoá vĩnh viễn huy hiệu khỏi hệ thống",
          badge: null,
        };
      } catch (error) {
        return {
          success: false,
          message: `Lỗi xoá vĩnh viễn: ${error.message}`,
          badge: null,
        };
      }
    },
  },
};
