import { Router } from 'express'
import * as categoriesContoller from './categories.controller.js'
import fileUpload, { fileValidation } from '../../services/multer.js'
import subCategoryRouter from '../subcategory/subcategory.router.js'
import { auth } from '../../middleware/auth.middleware.js';
const router = Router();

router.use("/:id/subcategory", subCategoryRouter)
router.get('/', auth(["Admin"]), categoriesContoller.getCategories);
router.get('/active', auth(["User", "Admin"]), categoriesContoller.getActiveCategories);
router.get('/:id', categoriesContoller.getSpecficCategory);
router.post('/', fileUpload(fileValidation.image).single('image'),
  categoriesContoller.createCategory);
router.put('/:id', fileUpload(fileValidation.image).single('image'),
  categoriesContoller.updateCategory);
export default router;