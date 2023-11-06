import couponModel from './../../../db/models/coupon.model.js';
export const createCoupon = async (req, res) => {
  const { name } = req.body;
  if (await couponModel.findOne({ name }))
    return res.status(409).json({ msg: "Coupon name already exist" })
  const coupon = await couponModel.create(req.body);
  return res.status(201).json({ msg: "Success", coupon });
};
export const getCoupons = async (req, res) => {
  const coupons = await couponModel.find({ isDeleted: false });
  return res.status(200).json({ msg: "Success", coupons });
}
export const updateCoupon = async (req, res) => {
  const { params: { id }, body: { name, amount } } = req;
  const coupon = await couponModel.findById(id);
  if (!coupon) {
    return res.status(404).json({ msg: "Coupon not found" });
  }
  if (name) {
    if (await couponModel.findOne({ name }).select('name')) {
      return res.status(409).json({ msg: "Name already exists" });
    }
    coupon.name = name;
  }

  if (amount) {
    coupon.amount = amount;
  }
  await coupon.save();
  return res.status(200).json({ msg: "Success", coupon });
}
export const softDelete = async (req, res) => {
  const { id: _id } = req.params;
  const coupon = await couponModel.findOneAndUpdate({ _id, isDeleted: false },
    {
      isDeleted: true,
    },
    { new: true });
  if (!coupon) {
    return res.status(400).json({ msg: "Cannot delete this coupon" });
  }
  return res.status(200).json({ msg: "Success" });
}