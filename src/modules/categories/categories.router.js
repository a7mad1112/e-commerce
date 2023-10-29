import { Router } from 'express'
import * as categoriesContoller from './categories.controllre.js'
import fileUpload, { fileValidation } from '../../services/multer.js'
const router = Router();

router.get('/', categoriesContoller.getCategories);
router.get('/:id', categoriesContoller.getSpecficCategory);
router.post('/', fileUpload(fileValidation.image).single('image'), 
  categoriesContoller.createCategory);

export default router;