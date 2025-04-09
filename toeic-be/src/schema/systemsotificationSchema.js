const { gql } = require("apollo-server-express");

const systemNotificationSchema = gql`
  type SystemNotification {
    id: ID!
    title: String!
    description: String!
    targetRole: String!
    isActive: Boolean!
    sender: User
    createdAt: String
    updatedAt: String
  }

  input CreateSystemNotificationInput {
    title: String!
    description: String!
    targetRole: String!
  }

  input UpdateSystemNotificationInput {
    id: ID!
    title: String
    description: String
    targetRole: String
    isActive: Boolean
  }

  type NotificationPayload {
    message: String!
    notification: SystemNotification
  }

  extend type Query {
    getSystemNotifications(role: String!): [SystemNotification!]!
    getSystemNotificationById(id: ID!): SystemNotification
  }

  extend type Mutation {
    createSystemNotification(
      input: CreateSystemNotificationInput!
    ): NotificationPayload!
    updateSystemNotification(
      input: UpdateSystemNotificationInput!
    ): NotificationPayload!
    deleteSystemNotification(id: ID!): Boolean!
  }
`;

module.exports = systemNotificationSchema;
