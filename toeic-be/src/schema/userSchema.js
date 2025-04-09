const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar DateTime

  enum UserStatus {
    ACTIVE
    LOCKED
    DELETED
  }

  type User {
    id: String!
    name: String!
    email: String!
    role: Role!
    avatar: String
    exp: Int!
    coin: Int!
    status: UserStatus!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Role {
    id: String!
    name: String!
    users: [User]
  }

  type Query {
    # Lấy danh sách tất cả người dùng
    getUsers: [User]

    # Lấy thông tin một người dùng cụ thể
    getUserById(id: String!): User

    # Lấy vai trò của người dùng
    getUserRole(userId: String!): Role

    # Lấy tất cả các vai trò
    getRoles: [Role]

    # Lấy thông tin người dùng hiện tại (đã xác thực)
    me: User
  }

  input RegisterInput {
    name: String!
    email: String!
    password: String!
    roleId: String!
  }

  input UpdateUserInput {
    name: String
    avatar: String
    roleId: String
  }

  type AuthPayload {
    status: Boolean!
    msg: String
    token: String
    user: User
  }

  type MessageResponse {
    status: Boolean!
    msg: String
  }

  type Mutation {
    # Đăng ký người dùng mới
    register(input: RegisterInput!): MessageResponse

    # Đăng nhập hệ thống
    login(email: String!, password: String!): AuthPayload

    # Cập nhật thông tin người dùng
    updateUser(id: String!, input: UpdateUserInput!): User

    # Xoá mềm người dùng
    deleteUser(id: String!): MessageResponse

    # Khoá tài khoản người dùng
    lockUser(id: String!): MessageResponse

    # Mở khoá tài khoản người dùng
    unlockUser(id: String!): MessageResponse

    # Cập nhật vai trò người dùng
    updateUserRole(userId: String!, roleId: String!): MessageResponse

    # uplad ảnh đại diện người dùng
    updateAvatar(userId: String!, base64Image: String!): User
  }
`;

module.exports = { typeDefs };
