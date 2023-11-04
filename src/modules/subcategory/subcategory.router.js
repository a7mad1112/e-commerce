import { Router } from 'express'
import * as categoriesContoller from './subcategory.controller.js'
const router = Router();

router.post('/', categoriesContoller.createSubCategory);

export default router;