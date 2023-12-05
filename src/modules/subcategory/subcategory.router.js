import { Router } from 'express'
import * as subCategoriesContoller from './subcategory.controller.js'
import fileUpload, { fileValidation } from '../../utils/multer.js'
import { asyncHandler } from '../../utils/errorHandler.js';
const router = Router({ mergeParams: true });

router.post('/', fileUpload(fileValidation.image).single('image'),
  asyncHandler(subCategoriesContoller.createSubCategory));
router.get('/', asyncHandler(subCategoriesContoller.getSubCategories));
export default router;