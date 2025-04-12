const { Coupon } = require("../models");
const createCoupon = async (data) => {
  const existing = await Coupon.findOne({ where: { code: data.code } });
  if (existing) throw new Error("Coupon code already exists");
  return await Coupon.create(data);
};

const updateCoupon = async (id, updates) => {
  const coupon = await Coupon.findByPk(id);
  if (!coupon) throw new Error("Coupon not found");
  await coupon.update(updates);
  return coupon;
};

const deleteCoupon = async (id) => {
  const coupon = await Coupon.findByPk(id);
  if (!coupon) throw new Error("Coupon not found");
  await coupon.destroy();
  return coupon;
};

const getAllCoupons = async () => {
  return await Coupon.findAll();
};

const getCouponById = async (id) => {
  return await Coupon.findByPk(id);
};

const getCouponByCode = async (code) => {
  return await Coupon.findOne({ where: { code } });
};

module.exports = {
  createCoupon,
  updateCoupon,
  deleteCoupon,
  getAllCoupons,
  getCouponById,
  getCouponByCode,
};
