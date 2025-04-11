const { gql } = require("apollo-server-express");

const systemNotificationSchema = gql`
  enum UserRole {
    STUDENT
    TEACHER
    ADMIN
    ALL
  }

  type SystemNotification {
    id: ID!
    title: String!
    description: String!
    targetRole: UserRole!
    isActive: Boolean!
    sender: User
    createdAt: String
    updatedAt: String
  }

  input CreateSystemNotificationInput {
    title: String!
    description: String!
    targetRole: UserRole! # Enum để tránh nhập sai chuỗi
  }

  input UpdateSystemNotificationInput {
    id: ID!
    title: String
    description: String
    targetRole: UserRole
    isActive: Boolean
  }

  type NotificationPayload {
    message: String!
    notification: SystemNotification
  }

  extend type Query {
    getSystemNotifications(role: UserRole!): [SystemNotification!]!
    getSystemNotificationById(id: ID!): SystemNotification
  }

  extend type Mutation {
    createSystemNotification(
      input: CreateSystemNotificationInput!
    ): NotificationPayload!

    updateSystemNotification(
      input: UpdateSystemNotificationInput!
    ): NotificationPayload!

    deleteSystemNotification(id: ID!): NotificationPayload!
  }
`;

module.exports = systemNotificationSchema;
