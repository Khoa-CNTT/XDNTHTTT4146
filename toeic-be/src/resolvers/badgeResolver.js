module.exports = {
  Query: {
    // Lấy tất cả badges (có thể kèm đã xoá nếu có flag)
    badges: async (_, { includeDeleted = false }, { models }) => {
      const scope = includeDeleted ? "withDeleted" : undefined;
      return await models.Badge.scope(scope).findAll();
    },

    // Lấy badge theo ID
    badge: async (_, { id }, { models }) => {
      return await models.Badge.findByPk(id);
    },

    // Lấy danh sách badge đã xoá mềm
    deletedBadges: async (_, __, { models }) => {
      return await models.Badge.scope("onlyDeleted").findAll();
    },
  },

  Mutation: {
    // Tạo mới badge
    createBadge: async (_, { input }, { models }) => {
      try {
        const badge = await models.Badge.create(input);
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

    // Cập nhật badge
    updateBadge: async (_, { id, input }, { models }) => {
      try {
        const badge = await models.Badge.findByPk(id);
        if (!badge) {
          return {
            success: false,
            message: "Không tìm thấy huy hiệu",
            badge: null,
          };
        }

        await badge.update(input);
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

    // Xoá mềm badge
    deleteBadge: async (_, { id }, { models }) => {
      try {
        const badge = await models.Badge.findByPk(id);
        if (!badge) {
          return {
            success: false,
            message: "Huy hiệu không tồn tại",
            badge: null,
          };
        }

        await badge.destroy(); // Soft delete
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

    // Khôi phục badge đã xoá
    restoreBadge: async (_, { id }, { models }) => {
      try {
        const badge = await models.Badge.scope("onlyDeleted").findByPk(id);
        if (!badge) {
          return {
            success: false,
            message: "Không tìm thấy huy hiệu đã xoá",
            badge: null,
          };
        }

        await badge.restore();
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

    // (Tùy chọn) Xoá vĩnh viễn badge khỏi DB
    forceDeleteBadge: async (_, { id }, { models }) => {
      try {
        const badge = await models.Badge.findByPk(id, { paranoid: false });
        if (!badge) {
          return {
            success: false,
            message: "Không tìm thấy huy hiệu để xoá vĩnh viễn",
            badge: null,
          };
        }

        await badge.destroy({ force: true }); // Hard delete
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
