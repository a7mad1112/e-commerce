import { Router } from 'express'
import * as categoriesContoller from './subcategory.controller.js'
import fileUpload, { fileValidation } from '../../services/multer.js'
const router = Router();

router.post('/', fileUpload(fileValidation.image).single('image'), categoriesContoller.createSubCategory);

export default router;