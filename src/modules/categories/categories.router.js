import { Router } from 'express'
import * as categoriesContoller from './categories.controllre.js'
const router = Router();

router.get('/', categoriesContoller.getCategories)
router.post('/', categoriesContoller.createCategory)

export default router;