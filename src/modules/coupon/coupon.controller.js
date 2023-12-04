import couponModel from './../../../db/models/coupon.model.js';
export const createCoupon = async (req, res) => {
  const { name } = req.body;
  req.body.expireData = new Date(req.body.expireData);
  if (await couponModel.findOne({ name })) {
    return next(new Error(`Coupon name already exist`, { cause: 409 }));
  }
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
    return next(new Error(`Coupon not found`, { cause: 404 }));
  }
  if (name) {
    if (await couponModel.findOne({ name }).select('name')) {
      return next(new Error(`Name already exists`, { cause: 409 }));
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
    return next(new Error(`Cannot delete this coupon`, { cause: 400 }));
  }
  return res.status(200).json({ msg: "Success" });
}
export const restore = async (req, res) => {
  const { id: _id } = req.params;
  const coupon = await couponModel.findOneAndUpdate({ _id, isDeleted: true },
    {
      isDeleted: false,
    },
    { new: true });
  if (!coupon) {
    return next(new Error(`Cannot restore this coupon`, { cause: 400 }));
  }
  return res.status(200).json({ msg: "Success" });
}
export const hardDelete = async (req, res) => {
  const { id: _id } = req.params;
  const coupon = await couponModel.findOneAndDelete({ _id })
  if (!coupon) {
    return next(new Error(`Cannot delete this coupon`, { cause: 400 }));
  }
  return res.status(200).json({ msg: "Success" });
}
