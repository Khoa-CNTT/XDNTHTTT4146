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

  type NotificationResponse {
    success: Boolean!
    message: String!
    notification: Notification
  }

  type Query {
    getNotificationsByUser(userId: ID!): [Notification!]!
    getUnreadNotifications(userId: ID!): [Notification!]!
    getNotificationById(id: ID!): Notification
  }

  type Mutation {
    createNotification(input: CreateNotificationInput!): NotificationResponse!
    markNotificationAsRead(id: ID!): NotificationResponse!
    markAllNotificationsAsRead(userId: ID!): NotificationResponse!
    deleteNotification(id: ID!): NotificationResponse!
  }
`;

module.exports = notificationSchema;
