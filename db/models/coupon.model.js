import mongoose, { Schema, Types, model } from "mongoose";

const couponSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  amount: {
    type: Number,
    required: true
  },
  usedBy: [{ type: Types.ObjectId, ref: "User" }],
  expireData: {
    type: Date,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  // createdBy: {
  //   type: Types.ObjectId.ref('User')
  // },
  // updatedBy: {
  //   type: Types.ObjectId.ref('User')
  // }
}, {
  timestamps: true,
});
const couponModel = mongoose.model.Coupon || model("Coupon", couponSchema);
export default couponModel;