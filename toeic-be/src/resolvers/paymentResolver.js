const { Payment, User, Course, Coupon } = require("../../models");

const paymentResolver = {
  Query: {
    getAllPayments: async () => {
      return await Payment.findAll({
        include: ["user", "course", "coupon"],
        order: [["paymentDate", "DESC"]],
      });
    },

    getPaymentById: async (_, { id }) => {
      return await Payment.findByPk(id, {
        include: ["user", "course", "coupon"],
      });
    },

    getPaymentsByUser: async (_, { userId }) => {
      return await Payment.findAll({
        where: { userId },
        include: ["course", "coupon"],
        order: [["paymentDate", "DESC"]],
      });
    },
  },

  Mutation: {
    createPayment: async (_, { input }) => {
      try {
        const payment = await Payment.create(input);
        return {
          success: true,
          message: "Payment created successfully.",
          payment,
        };
      } catch (error) {
        console.error("Create Payment Error:", error);
        return {
          success: false,
          message: "Failed to create payment.",
          payment: null,
        };
      }
    },

    updatePayment: async (_, { id, input }) => {
      try {
        const payment = await Payment.findByPk(id);
        if (!payment) {
          return {
            success: false,
            message: "Payment not found.",
            payment: null,
          };
        }

        await payment.update(input);

        return {
          success: true,
          message: "Payment updated successfully.",
          payment,
        };
      } catch (error) {
        console.error("Update Payment Error:", error);
        return {
          success: false,
          message: "Failed to update payment.",
          payment: null,
        };
      }
    },

    deletePayment: async (_, { id }) => {
      try {
        const payment = await Payment.findByPk(id);
        if (!payment) return false;
        await payment.destroy();
        return true;
      } catch (error) {
        console.error("Delete Payment Error:", error);
        return false;
      }
    },
  },

  Payment: {
    user: async (parent) => {
      return await User.findByPk(parent.userId);
    },
    course: async (parent) => {
      return parent.courseId ? await Course.findByPk(parent.courseId) : null;
    },
    coupon: async (parent) => {
      return parent.couponId ? await Coupon.findByPk(parent.couponId) : null;
    },
  },
};

module.exports = paymentResolver;
