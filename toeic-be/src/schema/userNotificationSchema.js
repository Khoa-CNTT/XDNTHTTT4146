const { gql } = require("apollo-server-express");

const typeDefs = gql`
  enum UserNotificationType {
    reward
    badge
    mission
    levelUp
    announcement
    system
  }

  enum NotificationStatus {
    read
    unread
  }

  # UserNotification type
  type UserNotification {
    id: ID!
    userId: ID!
    type: UserNotificationType!
    title: String!
    message: String!
    isRead: Boolean!
    metadata: JSON
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  # Input type để tạo UserNotification
  input UserNotificationInput {
    userId: ID!
    type: UserNotificationType!
    title: String!
    message: String!
    isRead: Boolean
    metadata: JSON
  }

  # Query để lấy thông báo của người dùng
  type Query {
    getUserNotifications(userId: ID!): [UserNotification]
    getUserNotification(id: ID!): UserNotification
  }

  # Mutation để tạo, cập nhật, xóa UserNotification
  type Mutation {
    createUserNotification(input: UserNotificationInput): UserNotification
    updateUserNotificationStatus(
      notificationId: ID!
      isRead: Boolean!
    ): UserNotification
    deleteUserNotification(notificationId: ID!): Boolean
  }
`;

module.exports = { typeDefs };
