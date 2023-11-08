import slugify from 'slugify';
import cloudinary from '../../services/cloudinary.js'
import categoryModel from '../../../db/models/category.model.js';

export const getCategories = async (req, res) => {
  const categories = await categoryModel.find().populate('SubCategory');
  return res.status(200).json({ msg: 'Success', categories });
};

export const getSpecficCategory = async (req, res) => {
  const { id } = req.params;
  const category = await categoryModel.findById(id);
  return res.json({ msg: "Success", category });
};

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
    },
    createdBy: req.user._id,
    updatedBy: req.user._id,
  });
  return res.status(201).json({ msg: 'Success', category: category });
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { file, body: { status, name }, } = req;
  const category = await categoryModel.findById(id)
  if (!category) {
    return res.status(404).json({ msg: 'Invalid category id' })
  }
  if (name) {
    if (await categoryModel.findOne({ name }).select('name')) {
      return res.status(409).json({ msg: `Category ${name} already exsist` })
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
  const categories = await categoryModel.find({ status: "Active" }).select('name image');
  return res.status(200).json({ msg: 'Success', categories });
  // return res.json("here")
}