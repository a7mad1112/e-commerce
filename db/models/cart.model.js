import mongoose, { Schema, Types, model } from "mongoose";

const cartSchema = new Schema({
  userId: {
    type: Types.ObjectId,
    required: true,
    ref: "User",
  },
  products: [{
    productId: { type: Types.ObjectId, required: true },
    quantity: {
      type: Number,
      default: 1
    }
  }]
}, {
  timestamps: true,
});
const cartModel = mongoose.model.Cart || model("Cart", cartSchema);
export default cartModel;