const { gql } = require("apollo-server-express");

const notificationSchema = gql`
  type Notification {
    id: ID!
    userId: ID!
    title: String!
    message: String!
    read: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  input CreateNotificationInput {
    userId: ID!
    title: String!
    message: String!
    read: Boolean = false
  }

  input UpdateNotificationInput {
    title: String
    message: String
    read: Boolean
  }

  type NotificationResponse {
    success: Boolean!
    message: String!
    notification: Notification
  }

  type BulkNotificationResponse {
    success: Boolean!
    message: String!
    notifications: [Notification!]
  }

  extend type Query {
    getNotificationsByUser(userId: ID!): [Notification!]!
    getUnreadNotifications(userId: ID!): [Notification!]!
    getNotificationById(id: ID!): Notification
  }

  extend type Mutation {
    createNotification(input: CreateNotificationInput!): NotificationResponse!
    updateNotification(
      id: ID!
      input: UpdateNotificationInput!
    ): NotificationResponse!
    markNotificationAsRead(id: ID!): NotificationResponse!
    markAllNotificationsAsRead(userId: ID!): BulkNotificationResponse!
    deleteNotification(id: ID!): NotificationResponse!
    deleteAllNotificationsByUser(userId: ID!): BulkNotificationResponse!
  }
`;

module.exports = notificationSchema;
