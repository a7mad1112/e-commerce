import { Router } from 'express'
import * as productsController from './products.controller.js'
import { auth } from '../../middleware/auth.middleware.js';
import { endPoints } from './../categories/categories.roles.js';
import fileUpload, { fileValidation } from '../../services/multer.js';
const router = Router();

router.get('/', productsController.getProducst)
router.post('/', auth(endPoints.create),
  fileUpload(fileValidation.image).fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'subImages', maxCount: 4 },
  ]),
  productsController.createProduct);

export default router;