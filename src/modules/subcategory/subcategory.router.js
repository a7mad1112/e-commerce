import { Router } from 'express'
import * as subCategoriesContoller from './subcategory.controller.js'
import fileUpload, { fileValidation } from '../../services/multer.js'
import { asyncHandler } from '../../services/errorHandler.js';
const router = Router({ mergeParams: true });

router.post('/', fileUpload(fileValidation.image).single('image'),
  asyncHandler(subCategoriesContoller.createSubCategory));
router.get('/', asyncHandler(subCategoriesContoller.getSubCategories));
export default router;