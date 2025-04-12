const UserNotification = require("../models/UserNotification");

class UserNotificationService {
  // Tạo một thông báo cho người dùng
  static async createUserNotification(input) {
    try {
      // Tạo thông báo mới
      const notification = new UserNotification(input);
      await notification.save();
      return notification;
    } catch (error) {
      console.error(error);
      throw new Error("Error creating user notification: " + error.message);
    }
  }

  // Lấy tất cả thông báo của người dùng
  static async getUserNotifications(userId) {
    try {
      if (!userId) {
        throw new Error("User ID is required");
      }

      // Truy vấn tất cả thông báo của người dùng
      return await UserNotification.find({ userId }).sort({ createdAt: -1 }); // Sắp xếp theo thời gian tạo, mới nhất lên đầu
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching user notifications: " + error.message);
    }
  }

  // Lấy một thông báo cụ thể
  static async getUserNotification(id) {
    try {
      if (!id) {
        throw new Error("Notification ID is required");
      }

      // Truy vấn thông báo theo ID
      const notification = await UserNotification.findById(id);
      if (!notification) {
        throw new Error("Notification not found");
      }
      return notification;
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching notification: " + error.message);
    }
  }

  // Cập nhật trạng thái đọc của thông báo
  static async updateNotificationStatus(notificationId, isRead) {
    try {
      if (!notificationId) {
        throw new Error("Notification ID is required");
      }

      // Cập nhật trạng thái đọc cho thông báo
      const notification = await UserNotification.findById(notificationId);
      if (!notification) {
        throw new Error("Notification not found");
      }

      notification.isRead = isRead;
      await notification.save();
      return notification;
    } catch (error) {
      console.error(error);
      throw new Error("Error updating notification status: " + error.message);
    }
  }

  // Xóa thông báo
  static async deleteUserNotification(notificationId) {
    try {
      if (!notificationId) {
        throw new Error("Notification ID is required");
      }

      // Xóa thông báo
      const notification = await UserNotification.findById(notificationId);
      if (!notification) {
        throw new Error("Notification not found");
      }

      await notification.remove();
      return true;
    } catch (error) {
      console.error(error);
      throw new Error("Error deleting user notification: " + error.message);
    }
  }
}

module.exports = UserNotificationService;
