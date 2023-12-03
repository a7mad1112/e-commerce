import { Router } from 'express'
import * as productsController from './products.controller.js'
import { auth } from '../../middleware/auth.middleware.js';
import { endPoints } from './products.roles.js';
import fileUpload, { fileValidation } from '../../services/multer.js';
import { asyncHandler } from './../../services/errorHandler.js';
import * as validators from './product.validation.js';
import { validation } from '../../middleware/validation.js';
const router = Router();

router.get('/', asyncHandler(productsController.getProducst));
router.post('/', auth(endPoints.create),
  fileUpload(fileValidation.image).fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'subImages', maxCount: 4 },
  ]),
  validation(validators.createProduct),
  asyncHandler(productsController.createProduct));

export default router;