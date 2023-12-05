import { Router } from 'express'
import * as categoriesContoller from './categories.controller.js'
import fileUpload, { fileValidation } from '../../services/multer.js'
import subCategoryRouter from '../subcategory/subcategory.router.js'
import { auth } from '../../middleware/auth.middleware.js';
import { endPoints } from './categories.roles.js';
import { asyncHandler } from '../../services/errorHandler.js';
import { validation } from '../../middleware/validation.js';
import * as validators from './categories.validation.js';
const router = Router();

router.post('/', auth(endPoints.create), fileUpload(fileValidation.image).single('image'),
  validation(validators.createCategory),
  asyncHandler(categoriesContoller.createCategory));
router.use("/:id/subcategory", auth(endPoints.getAll), asyncHandler(subCategoryRouter))
router.get('/', asyncHandler(categoriesContoller.getCategories));
router.get('/active', asyncHandler(categoriesContoller.getActiveCategories));
router.get('/:id', asyncHandler(categoriesContoller.getSpecficCategory));
router.put('/:id', auth(endPoints.update), fileUpload(fileValidation.image).single('image'),
  asyncHandler(categoriesContoller.updateCategory));
export default router;