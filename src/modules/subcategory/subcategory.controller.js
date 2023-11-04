import categoryModel from '../../../db/models/category.model.js';
import subCategoryModel from './../../../db/models/subcategory.model.js';
import cloudinary from './../../services/cloudinary.js';
export const createSubCategory = async (req, res) => {
  const { name, categoryId } = req.body;
  const subcategory = await subCategoryModel.findOne({ name });
  if (subcategory) {
    return res.status(409).json({ msg: "Sub Category  " + name + " already exist" });
  }
  const category = await subCategoryModel.findById(categoryId);
  if (!category) {
    return res.status(404).json({ msg: "Category not found" });
  }
  const { secure_url, public_id } = await cloudinary.uploader.upload(file.path, {
    folder: `${process.env.APP_NAME}/sub-categories`
  });
  const subCategory = await subCategoryModel.create({ name, slug: slugify(name), categoryId, image: { secure_url, public_id } })
  return res.status(201).json({ msg: "Success", subCategory });

};

export const getSubCategories = async (req, res) => {
  const categoryId = req.params.id;
  const category = await categoryModel.findById(categoryId);
  if (!category) {
    return res.status(404).json({ msg: "Category not found" });
  }
  const subCategories = await subCategoryModel.find({ categoryId }).populate({
    path: 'categoryId'
  });
  return res.status(200).json({ msg: 'Success', subCategories });
}