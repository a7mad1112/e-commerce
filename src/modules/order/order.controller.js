import cartModel from "../../../db/models/cart.model.js";
import orderModel from "../../../db/models/order.model.js";
import userModel from "../../../db/models/user.model.js";
import couponModel from './../../../db/models/coupon.model.js';
import productModel from './../../../db/models/product.model.js';

export const createOrder = async (req, res, next) => {
  const { couponName } = req.body;
  //* check carts
  const cart = await cartModel.findOne({ userId: req.user._id });
  if (!cart) {
    return next(new Error("Cart is empty", { cause: 400 }));
  }
  req.body.products = cart.products;
  //* check coupon
  if (couponName) {
    const couponInDB = await couponModel.findOne({ name: couponName });
    if (!couponInDB) {
      return next(new Error("Coupon not found", { cause: 404 }));
    }
    const currentDate = new Date();
    if (couponInDB.expireData <= currentDate) {
      return next(new Error("This coupon expired", { cause: 400 }));
    }
    if (couponInDB.usedBy?.includes(req.user._id)) {
      return next(new Error("This coupon already used", { cause: 409 }));
    }
    req.body.couponName = couponInDB;
  }
  let subTotal = 0;
  const finalProductList = [];
  for (let product of req.body.products) {
    const checkProduct = await productModel.findOne({
      _id: product.productId,
      stack: { $gte: product.quantity },
    });
    if (!checkProduct) {
      return next(new Error("Product quantity not availabe ", { cause: 400 }));
    }
    product = product.toObject();
    // product.name = checkProduct.name;
    product.unitPrice = checkProduct.price;
    // product.discount = checkProduct.discount;
    product.finalPrice = product.quantity * checkProduct.finalPrice;
    subTotal += product.finalPrice;
    finalProductList.push(product);
  }
  const user = await userModel.findById(req.user._id);
  if (!req.body.address) {
    req.body.address = user.address;
  }
  if (!req.body.phone) {
    req.body.phone = user.phone;
  }
  const order = await orderModel.create({
    userId: req.user._id,
    products: finalProductList,
    finalPrice: subTotal - (subTotal * ((req.body.couponName?.amount || 0) / 100)),
    address: req.body.address,
    phoneNumber: req.body.phone,
    couponName: req.body.couponName ?? '',
  });
  //* every thing is ok, now must increment the stock, empty the cart, and increment product quantity
  for (const product of req.body.products) {
    await productModel.updateOne({ _id: product.productId }, { $inc: { stack: -product.quantity } })
  }

  if (req.body.couponName) {
    await couponModel.updateOne({ _id: req.body.couponName._id }, { $addToSet: { usedBy: req.user._id } });
  }
  await cartModel.updateOne({ userId: req.user._id }, { products: [] });
  return res.status(201).json({ msg: "Success", order });
};

export const candelOrder = async (req, res, next) => {
  const { orderId } = req.params;
  const order = await orderModel.findOne({ _id: orderId, userId: req.user._id });
  if (!order) {
    return next(new Error(`Order not found`, { cause: 404 }));
  }
  if (order.status != 'pending') {
    return next(new Error(`Cannot cancelled this order`, { cause: 400 }));
  }
  req.body.status = 'cancelled';
  req.body.updatedBy = req.user._id;
  const cancelledOrder = await orderModel.findByIdAndUpdate(orderId, req.body, { new: true });
  for (const product of cancelledOrder.products) {
    await productModel.updateOne({ _id: product.productId }, { $inc: { stack: product.quantity } })
  }
  if (req.body.couponName) {
    await couponModel.updateOne({ _id: req.body.couponName._id }, { $pull: { usedBy: req.user._id } });
  }
  return res.status(200).json({ msg: "Success", order: cancelledOrder });
};

export const getOrders = async (req, res) => {
  const orders = await orderModel.find({ userId: req.user._id });
  return res.status(200).json({ msg: "Success", orders });
}