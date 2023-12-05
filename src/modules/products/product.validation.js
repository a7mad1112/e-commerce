import joi from 'joi';
import { generalFields } from '../../middleware/validation.js';

export const createProduct = joi.object({
  name: joi.string().min(3).max(25).required(),
  description: joi.string().min(2).max(150000),
  stack: joi.number().integer().required(),
  price: joi.number().positive().required(),
  discount: joi.number().positive().min(1),
  file: joi.object({
    mainImage: joi.array().items(generalFields.file).length(1),
    subImages: joi.array().items(generalFields.file).max(5),
  }),
  status: joi.string().valid('Active', 'Inactive'),
  categoryId: joi.string().required(),
  subCategoryId: joi.string(),
}).required();
