const { SystemNotification } = require("../../models");
const { Op } = require("sequelize");

class SystemNotificationService {
  static async createNotification(input) {
    try {
      if (
        !input.title ||
        !input.description ||
        !input.senderId ||
        !input.targetRole
      ) {
        throw new Error(
          "Missing required fields: title, description, senderId, or targetRole."
        );
      }

      const notification = await SystemNotification.create(input);
      return notification;
    } catch (error) {
      throw new Error("Error creating notification: " + error.message);
    }
  }

  static async getNotifications(filter = {}) {
    try {
      const whereCondition = {};

      if (filter.type) whereCondition.type = filter.type;
      if (filter.targetRole) whereCondition.targetRole = filter.targetRole;
      if (filter.isActive !== undefined)
        whereCondition.isActive = filter.isActive;

      return await SystemNotification.findAll({
        where: whereCondition,
        order: [["createdAt", "DESC"]],
      });
    } catch (error) {
      throw new Error("Error retrieving notifications: " + error.message);
    }
  }

  static async getActiveNotifications() {
    try {
      return await SystemNotification.findAll({
        where: { isActive: true },
        order: [
          ["priority", "DESC"],
          ["createdAt", "DESC"],
        ],
      });
    } catch (error) {
      throw new Error(
        "Error retrieving active notifications: " + error.message
      );
    }
  }

  static async updateNotificationStatus(notificationId, status) {
    try {
      const notification = await SystemNotification.findByPk(notificationId);
      if (!notification) {
        throw new Error("Notification not found");
      }

      notification.isActive = status;
      await notification.save();
      return notification;
    } catch (error) {
      throw new Error("Error updating notification status: " + error.message);
    }
  }

  static async deleteNotification(notificationId) {
    try {
      const notification = await SystemNotification.findByPk(notificationId);
      if (!notification) {
        throw new Error("Notification not found");
      }

      await notification.destroy();
      return true;
    } catch (error) {
      throw new Error("Error deleting notification: " + error.message);
    }
  }

  static async getNotificationsByTimeRange(startDate, endDate) {
    try {
      return await SystemNotification.findAll({
        where: {
          createdAt: {
            [Op.between]: [startDate, endDate],
          },
        },
        order: [["createdAt", "DESC"]],
      });
    } catch (error) {
      throw new Error(
        "Error retrieving notifications by time range: " + error.message
      );
    }
  }

  static async getNotificationsByUser(targetUserId) {
    try {
      return await SystemNotification.findAll({
        where: { targetUserId },
        order: [["createdAt", "DESC"]],
      });
    } catch (error) {
      throw new Error(
        "Error retrieving notifications for a specific user: " + error.message
      );
    }
  }
}

module.exports = SystemNotificationService;
