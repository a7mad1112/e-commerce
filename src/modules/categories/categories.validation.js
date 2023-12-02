import joi from 'joi';
import { generalFields } from '../../middleware/validation.js';

export const createCategory = joi.object({
  name: joi.string().min(3).max(25).required(),
  // file: joi.array().items(generalFields.file.required()).required(),
  file: generalFields.file.required(),
});