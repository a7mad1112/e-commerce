import couponModel from './../../../db/models/coupon.model.js';
export const createCoupon = async (req, res) => {
  const { name } = req.body;
  if (await couponModel.findOne({ name }))
    return res.status(409).json({ msg: "Coupon name already exist" })
  const coupon = await couponModel.create(req.body);
  return res.status(201).json({ msg: "Success", coupon });
};
export const getCoupons = async (req, res) => {
  const coupons = await couponModel.find({});
  return res.status(200).json({ msg: "Success", coupons });
}