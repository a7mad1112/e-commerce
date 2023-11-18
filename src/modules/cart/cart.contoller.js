import cartModel from './../../../db/models/cart.model.js';
export const createCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const cart = await cartModel.findOne({ userId: req.user._id });
  if (!cart) {
    const newCart = await cartModel.create({
      userId: req.user._id,
      products: { productId, quantity },
    });
    return res.status(201).json({ msg: "Success", cart: newCart });
  }
  for (let i = 0; i < cart.products.length; i++) {
    if (cart.products[i].productId == productId) {
      cart.products[i].quantity = quantity;
      await cart.save();
      return res.status(200).json({ msg: "Quantity updated in the user's cart", cart });
    }
  }
  cart.products.push({ productId, quantity });
  await cart.save();
  return res.status(201).json({ msg: "New product added to the cart", cart });
};

export const removeItem = async (req, res) => {
  const { productId } = req.body;
  await cartModel.updateOne({ userId: req.user._id }, {
    $pull: {
      products: {
        productId
      }
    }
  });
  return res.json({ msg: "here" });
}