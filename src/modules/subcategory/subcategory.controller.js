import categoryModel from '../../../db/models/category.model.js';
import subCategoryModel from './../../../db/models/subcategory.model.js';
import cloudinary from './../../services/cloudinary.js';
import slugify from 'slugify';
export const createSubCategory = async (req, res) => {
  const { name, categoryId } = req.body;
  const subcategory = await subCategoryModel.findOne({ name });
  if (subcategory) {
    return next(new Error("Sub Category  " + name + " already exist", { cause: 409 }));
  }
  const category = await categoryModel.findById(categoryId);
  if (!category) {
    return next(new Error(`Category not found`, { cause: 404 }));
  }
  (req.file)
  const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
    folder: `${process.env.APP_NAME}/sub-categories`
  });
  const subCategory = await subCategoryModel.create({ name, slug: slugify(name), categoryId, image: { secure_url, public_id } })
  return res.status(201).json({ msg: "Success", subCategory });
};

export const getSubCategories = async (req, res) => {
  const categoryId = req.params.id;
  const category = await categoryModel.findById(categoryId);
  if (!category) {
    return next(new Error(`Category not found`, { cause: 404 }));
  }
  const subCategories = await subCategoryModel.find({ categoryId }).populate({
    path: 'categoryId'
  });
  return res.status(200).json({ msg: 'Success', subCategories });
}