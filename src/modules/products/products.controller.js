import slugify from 'slugify';
import categoryModel from './../../../db/models/category.model.js';
import subCategoryModel from './../../../db/models/subcategory.model.js';
import cloudinary from './../../services/cloudinary.js';
import productModel from '../../../db/models/product.model.js';
export const getProducts = (req, res) => {
  return res.json("products")
}

export const createProduct = async (req, res) => {
  const {
    body: {
      name, price, discount = 0, categoryId, subCategoryId,
    },
    files: {
      mainImage,
      subImages,
    }
  } = req;
  const { APP_NAME } = process.env;
  if (!await categoryModel.findById(categoryId)) {
    return next(new Error(`Category not found`, { cause: 404 }));
  }
  if (!await subCategoryModel.findById(subCategoryId)) {
    return next(new Error(`Sub-category not found`, { cause: 404 }));
  }
  req.body.slug = slugify(name);
  req.body.finalPrice = (price - (price * discount / 100)).toFixed(2);

  const { secure_url, public_id } = await cloudinary.uploader.upload(mainImage[0].path,
    { folder: `${APP_NAME}/product/${name}/main-image` });
  req.body.mainImage = { secure_url, public_id };
  req.body.subImages = [];
  for (const image of subImages) {
    const { secure_url, public_id } = await cloudinary.uploader.upload(image.path,
      { folder: `${APP_NAME}/product/${name}/sub-images` });
    req.body.subImages.push({ secure_url, public_id })
  }
  req.body.createdBy = req.user._id;
  req.body.updatedBy = req.user._id;
  const product = await productModel.create(req.body);
  if (!product) {
    return next(new Error(`Error while creating product`, { cause: 400 }));
  }
  return res.status(201).json({ msg: "Success", product });
};

export const getProductsWithCategory = async (req, res) => {
  const products = await productModel.find({ categoryId: req.params.categoryId });
  return res.status(200).json({ msg: "Success", products });
};

export const getProductById = async (req, res) => {
  const product = await productModel.findById(req.params.productId);
  return res.json({ msg: "Success", product });
};