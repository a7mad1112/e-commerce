import slugify from 'slugify';
import categoryModel from './../../../db/models/category.model.js';
import subCategoryModel from './../../../db/models/subcategory.model.js';
import cloudinary from './../../services/cloudinary.js';
import productModel from '../../../db/models/product.model.js';
export const getProducst = (req, res) => {
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
    return res.status(404).json({ msg: "Category not found" });
  }
  if (!await subCategoryModel.findById(subCategoryId)) {
    return res.status(404).json({ msg: "Sub-category not found" });
  }
  req.body.slug = slugify(name);
  req.body.finalPrice = price - (price * discount / 100);

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
    return res.status(400).json({ msg: "Error while creating product" });
  }
  return res.status(201).json({ msg: "Success", product });
};