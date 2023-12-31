import mongoose, { Schema, Types, model } from "mongoose";
const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  stack: {
    type: Number,
    default: 1
  },
  price: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    default: 0
  },
  finalPrice: {
    type: Number,
  },
  mainImage: {
    type: Object,
    required: true,
  },
  subImages: [{
    type: Object,
    required: true,
  }],
  number_sellers: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    default: 'Active',
    enum: ['Active', 'Inactive']
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  colors: [String],
  sizes: [{
    type: String,
    enum: ["s", 'm', 'lg', 'xl']
  }],
  createdBy: {
    type: Types.ObjectId,
    ref: 'User',
    required: true
  },
  updatedBy: {
    type: Types.ObjectId,
    ref: 'User',
    required: true
  },
  categoryId: {
    type: Types.ObjectId,
    ref: 'Category',
    required: true
  },
  subCategoryId: {
    type: Types.ObjectId,
    ref: 'SubCategory',
  },
}, {
  timestamps: true,
});
const productModel = mongoose.model.Product || model("Product", productSchema);
export default productModel;