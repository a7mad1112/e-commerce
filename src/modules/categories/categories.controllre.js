import slugify from 'slugify';
import cloudinary from '../../services/cloudinary.js'
import categoryModel from './../../../db/models/category.model.js';

export const getCategories = async (req, res) => {
  const categories = await categoryModel.find();
  return res.status(200).json({ msg: 'Success', categories });
}

export const createCategory = async (req, res) => {
  const name = req.body.name.toLowerCase();
  if (await categoryModel.findOne({ name }))
    return res.status(409).json({ msg: "Category name already exists" })
  const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
    folder: `${process.env.APP_NAME}/categories`
  });
  const category = await categoryModel.create({
    name, slug: slugify(name), image: {
      secure_url, public_id
    }
  });
  return res.status(201).json({ msg: 'Success', category: category });
}