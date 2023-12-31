import slugify from 'slugify';
import cloudinary from '../../utils/cloudinary.js'
import categoryModel from '../../../db/models/category.model.js';
import { pagination } from './../../utils/pagination.js';
import productModel from '../../../db/models/product.model.js';

export const getCategories = async (req, res) => {
  const { limit, skip } = pagination(req.query.page, req.query.limit);
  const categories = await categoryModel.find()
    .skip(+skip)
    .limit(+limit)
    .populate('SubCategory');
  return res.status(200).json({ msg: 'Success', categories });
};

export const getSpecficCategory = async (req, res, next) => {
  const { id } = req.params;
  const category = await categoryModel.findById(id);
  if (!category) {
    return next(new Error("Category not found", { cause: 404 }));
  }
  return res.json({ msg: "Success", category });
};

export const createCategory = async (req, res, next) => {
  const name = req.body.name.toLowerCase();
  if (await categoryModel.findOne({ name })) {
    return next(new Error("Category name already exists", { cause: 409 }));
  }
  if (!req.file) {
    return next(new Error("No file provided", { cause: 400 }));
  }
  const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
    folder: `${process.env.APP_NAME}/categories`
  });
  const category = await categoryModel.create({
    name, slug: slugify(name), image: {
      secure_url, public_id
    },
    createdBy: req.user._id,
    updatedBy: req.user._id,
  });
  return res.status(201).json({ msg: 'Success', category: category });
};

export const updateCategory = async (req, res, next) => {
  const { id } = req.params;
  const { file, body: { status, name }, } = req;
  const category = await categoryModel.findById(id)
  if (!category) {
    return next(new Error("Invalid category id", { cause: 404 }));
  }
  if (name) {
    if (await categoryModel.findOne({ name, _id: { $ne: category._id } }).select('name')) {
      return next(new Error(`Category ${name} already exsist`, { cause: 409 }));
    }
    category.name = name;
    category.slug = slugify(name);
  }

  if (status)
    category.status = status;

  if (file) {
    const { secure_url, public_id } = await cloudinary.uploader.upload(file.path, {
      folder: `${process.env.APP_NAME}/categories`
    });
    await cloudinary.uploader.destroy(category.image.public_id);
    category.image = { secure_url, public_id };
  }
  category.updatedBy = req.user._id;
  await category.save();
  return res.json({ msg: 'Success', category });
}

export const getActiveCategories = async (req, res) => {
  const { limit, skip } = pagination(req.query.page, req.query.limit);
  const categories = await categoryModel.find({ status: "Active" })
    .skip(+skip)
    .limit(+limit)
    .select('name image');
  return res.status(200).json({ count: categories.length, msg: 'Success', categories, });
}

export const deleteCategory = async (req, res, next) => {
  const { categoryId } = req.params;
  const category = await categoryModel.findByIdAndDelete(categoryId);
  if (!category) {
    return next(new Error("Category not found", { cause: 404 }));
  }
  await productModel.deleteMany({ categoryId });
  return res.status(200).json({ msg: "Success", category });
}