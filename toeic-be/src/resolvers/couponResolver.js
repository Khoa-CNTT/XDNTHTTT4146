const couponService = require("../services/couponService");

const CouponResolver = {
  Query: {
    getAllCoupons: async () => await couponService.getAllCoupons(),
    getCouponById: async (_, { id }) => await couponService.getCouponById(id),
    getCouponByCode: async (_, { code }) =>
      await couponService.getCouponByCode(code),
  },
  Mutation: {
    createCoupon: async (_, { input }) => {
      try {
        const coupon = await couponService.createCoupon(input);
        return {
          success: true,
          message: "Coupon created successfully",
          coupon,
        };
      } catch (error) {
        return { success: false, message: error.message, coupon: null };
      }
    },
    updateCoupon: async (_, { id, input }) => {
      try {
        const coupon = await couponService.updateCoupon(id, input);
        return {
          success: true,
          message: "Coupon updated successfully",
          coupon,
        };
      } catch (error) {
        return { success: false, message: error.message, coupon: null };
      }
    },
    deleteCoupon: async (_, { id }) => {
      try {
        const coupon = await couponService.deleteCoupon(id);
        return {
          success: true,
          message: "Coupon deleted successfully",
          coupon,
        };
      } catch (error) {
        return { success: false, message: error.message, coupon: null };
      }
    },
  },
};

module.exports = CouponResolver;
