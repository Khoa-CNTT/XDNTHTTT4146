const UserNotificationService = require("../../services/userNotificationService");

const resolvers = {
  Query: {
    getUserNotifications: async (_, { userId }) => {
      try {
        // Kiểm tra userId có hợp lệ không
        if (!userId) {
          throw new Error("User ID is required");
        }
        return await UserNotificationService.getUserNotifications(userId);
      } catch (error) {
        console.error(error);
        throw new Error("Error fetching user notifications");
      }
    },
    getUserNotification: async (_, { id }) => {
      try {
        if (!id) {
          throw new Error("Notification ID is required");
        }
        return await UserNotificationService.getUserNotification(id);
      } catch (error) {
        console.error(error);
        throw new Error("Error fetching the notification");
      }
    },
  },
  Mutation: {
    createUserNotification: async (_, { input }) => {
      try {
        // Kiểm tra input có hợp lệ không
        if (!input || !input.userId || !input.title || !input.message) {
          throw new Error(
            "Invalid input, userId, title, and message are required"
          );
        }
        return await UserNotificationService.createUserNotification(input);
      } catch (error) {
        console.error(error);
        throw new Error("Error creating user notification");
      }
    },
    updateUserNotificationStatus: async (_, { notificationId, isRead }) => {
      try {
        // Kiểm tra notificationId và isRead có hợp lệ không
        if (!notificationId) {
          throw new Error("Notification ID is required");
        }
        if (typeof isRead !== "boolean") {
          throw new Error("isRead should be a boolean value");
        }
        return await UserNotificationService.updateNotificationStatus(
          notificationId,
          isRead
        );
      } catch (error) {
        console.error(error);
        throw new Error("Error updating notification status");
      }
    },
    deleteUserNotification: async (_, { notificationId }) => {
      try {
        // Kiểm tra notificationId có hợp lệ không
        if (!notificationId) {
          throw new Error("Notification ID is required");
        }
        return await UserNotificationService.deleteUserNotification(
          notificationId
        );
      } catch (error) {
        console.error(error);
        throw new Error("Error deleting user notification");
      }
    },
  },
};

module.exports = resolvers;
