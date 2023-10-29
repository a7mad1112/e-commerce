import slugify from 'slugify';
import cloudinary from '../../services/cloudinary.js'
import categoryModel from './../../../db/models/category.model';

export const getCategories = (req, res) => {
  return res.json("categories");
}

export const createCategory = async (req, res) => {
  const category = await categoryModel.findOne({ name });
  if (category)
    return res.status(409).json({ msg: "Category name already exists" })
  const name = req.body.name.toLowerCase();
  const slugName = slugify(name);
  const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
    folder: `${process.env.APP_NAME}/categories`
  });
  const categ = await categoryModel.create({
    name, slug: slugName, image: {
      secure_url, public_id
    }
  })
  return res.status(201).json({ msg: 'Success', category: categ });
}