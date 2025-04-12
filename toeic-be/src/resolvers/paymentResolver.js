const PaymentService = require("../services/paymentService");

module.exports = {
  Mutation: {
    topUp: async (_, { amount, method }, { user }) => {
      if (!user) throw new Error("Authentication required.");
      return await PaymentService.topUp(user.id, amount, method);
    },
    buyCourse: async (_, { courseId, method }, { user }) => {
      if (!user) throw new Error("Authentication required.");
      return await PaymentService.buyCourse(user.id, courseId, method);
    },
  },
};
