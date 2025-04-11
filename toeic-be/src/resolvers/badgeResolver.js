module.exports = {
  Query: {
    // Lấy tất cả badges, có thể bao gồm cả đã xóa nếu có flag
    badges: async (_, { includeDeleted = false }, { models }) => {
      const scope = includeDeleted ? "withDeleted" : undefined;
      return models.Badge.scope(scope).findAll();
    },

    // Lấy 1 badge cụ thể theo ID
    badge: async (_, { id }, { models }) => {
      return models.Badge.findByPk(id);
    },

    // Lấy danh sách chỉ các badge đã xóa mềm (soft-deleted)
    deletedBadges: async (_, __, { models }) => {
      return models.Badge.scope("onlyDeleted").findAll();
    },
  },

  Mutation: {
    // Tạo mới một badge
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

    // Cập nhật thông tin badge
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

    // Xóa mềm badge
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

        await badge.destroy();
        return {
          success: true,
          message: "Đã xóa huy hiệu (soft delete)",
          badge,
        };
      } catch (error) {
        return {
          success: false,
          message: `Lỗi xóa huy hiệu: ${error.message}`,
          badge: null,
        };
      }
    },

    // Khôi phục badge đã bị soft-delete
    restoreBadge: async (_, { id }, { models }) => {
      try {
        const badge = await models.Badge.scope("onlyDeleted").findByPk(id);
        if (!badge) {
          return {
            success: false,
            message: "Không tìm thấy huy hiệu đã xóa",
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
  },
};
