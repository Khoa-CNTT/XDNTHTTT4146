const SystemNotificationService = require("../../services/systemNotificationService");

const resolvers = {
  Query: {
    async getSystemNotifications(_, { filter }) {
      try {
        return await SystemNotificationService.getNotifications({
          type: filter,
        });
      } catch (error) {
        throw new Error("Error retrieving notifications: " + error.message);
      }
    },

    async getActiveSystemNotifications() {
      try {
        return await SystemNotificationService.getActiveNotifications();
      } catch (error) {
        throw new Error(
          "Error retrieving active notifications: " + error.message
        );
      }
    },
  },

  Mutation: {
    async createSystemNotification(_, { input }) {
      try {
        return await SystemNotificationService.createNotification(input);
      } catch (error) {
        throw new Error("Error creating notification: " + error.message);
      }
    },

    async updateSystemNotificationStatus(_, { notificationId, status }) {
      try {
        return await SystemNotificationService.updateNotificationStatus(
          notificationId,
          status
        );
      } catch (error) {
        throw new Error("Error updating notification status: " + error.message);
      }
    },

    async deleteSystemNotification(_, { notificationId }) {
      try {
        return await SystemNotificationService.deleteNotification(
          notificationId
        );
      } catch (error) {
        throw new Error("Error deleting notification: " + error.message);
      }
    },
  },
};

module.exports = { resolvers };
