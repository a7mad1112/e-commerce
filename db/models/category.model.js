import mongoose, { Schema, Types, model } from "mongoose";

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
  },
  image: {
    type: Object,
    required: true,
  },
  status: {
    type: String,
    default: 'Active',
    enum: ['Active', 'Inactive']
  },
  // createdBy: {
  //   type: Types.ObjectId.ref('User')
  // },
  // updatedBy: {
  //   type: Types.ObjectId.ref('User')
  // }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: {virtuals: true}
});
categorySchema.virtual('SubCategory', {
  localField: '_id',
  foreignField: 'categoryId',
  ref: "SubCategory"
});
const categoryModel = mongoose.model.Category || model("Category", categorySchema);
export default categoryModel;