import { Router } from 'express'
import * as subCategoriesContoller from './subcategory.controller.js'
import fileUpload, { fileValidation } from '../../services/multer.js'
const router = Router({ mergeParams: true });

router.post('/', fileUpload(fileValidation.image).single('image'), subCategoriesContoller.createSubCategory);
router.get('/', subCategoriesContoller.getSubCategories)
export default router;