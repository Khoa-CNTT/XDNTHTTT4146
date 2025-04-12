const { gql } = require("apollo-server-express");

const typeDefs = gql`
  enum NotificationType {
    info
    warning
    achievement
    event
    system
  }

  enum TargetRole {
    student
    teacher
    admin
    all
  }

  enum NotificationStatus {
    active
    inactive
  }

  type SystemNotification {
    id: ID!
    title: String!
    description: String!
    type: NotificationType!
    targetRole: TargetRole!
    targetUserId: ID
    senderId: ID!
    isActive: Boolean!
    startAt: DateTime
    endAt: DateTime
    priority: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  input SystemNotificationInput {
    title: String!
    description: String!
    type: NotificationType!
    targetRole: TargetRole!
    targetUserId: ID
    senderId: ID!
    isActive: Boolean
    startAt: DateTime
    endAt: DateTime
    priority: Int
  }

  type Query {
    getSystemNotifications(filter: String): [SystemNotification]
    getActiveSystemNotifications: [SystemNotification]
  }

  type Mutation {
    createSystemNotification(input: SystemNotificationInput): SystemNotification
    updateSystemNotificationStatus(
      notificationId: ID!
      status: Boolean
    ): SystemNotification
    deleteSystemNotification(notificationId: ID!): Boolean
  }
`;

module.exports = { typeDefs };
