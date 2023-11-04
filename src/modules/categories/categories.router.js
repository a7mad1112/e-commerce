import { Router } from 'express'
import * as categoriesContoller from './categories.controller.js'
import fileUpload, { fileValidation } from '../../services/multer.js'
import subCategoryRouter from '../subcategory/subcategory.router.js'
const router = Router();

router.use("/:id/subcategory", subCategoryRouter)
router.get('/', categoriesContoller.getCategories);
router.get('/active', categoriesContoller.getActiveCategories);
router.get('/:id', categoriesContoller.getSpecficCategory);
router.post('/', fileUpload(fileValidation.image).single('image'),
  categoriesContoller.createCategory);
router.put('/:id', fileUpload(fileValidation.image).single('image'), 
  categoriesContoller.updateCategory);
export default router;