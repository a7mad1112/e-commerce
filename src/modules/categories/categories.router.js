import { Router } from 'express'
import * as categoriesContoller from './categories.controller.js'
import fileUpload, { fileValidation } from '../../services/multer.js'
const router = Router();

router.get('/', categoriesContoller.getCategories);
router.get('/active', categoriesContoller.getActiveCategories);
router.get('/:id', categoriesContoller.getSpecficCategory);
router.post('/', fileUpload(fileValidation.image).single('image'),
  categoriesContoller.createCategory);
router.put('/:id', fileUpload(fileValidation.image).single('image'), 
  categoriesContoller.updateCategory);
export default router;