const { gql } = require("apollo-server-express");

const couponSchema = gql`
  scalar DateTime

  enum DiscountType {
    percentage
    fixed
  }

  type Coupon {
    id: ID!
    code: String!
    description: String
    discountType: DiscountType!
    discountValue: Int!
    maxUsage: Int
    usedCount: Int!
    expiredAt: DateTime
    isActive: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  input CreateCouponInput {
    code: String!
    description: String
    discountType: DiscountType!
    discountValue: Int!
    maxUsage: Int
    expiredAt: DateTime
  }

  input UpdateCouponInput {
    description: String
    discountType: DiscountType
    discountValue: Int
    maxUsage: Int
    expiredAt: DateTime
    isActive: Boolean
  }

  type CouponResponse {
    success: Boolean!
    message: String!
    coupon: Coupon
  }

  extend type Query {
    getAllCoupons: [Coupon!]!
    getCouponByCode(code: String!): Coupon
    getCouponById(id: ID!): Coupon
  }

  extend type Mutation {
    createCoupon(input: CreateCouponInput!): CouponResponse
    updateCoupon(id: ID!, input: UpdateCouponInput!): CouponResponse
    deleteCoupon(id: ID!): CouponResponse
  }
`;

module.exports = { couponSchema };
