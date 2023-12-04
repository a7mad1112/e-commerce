import { Router } from 'express'
import * as orderController from './order.controller.js'
import { asyncHandler } from '../../services/errorHandler.js';
import * as validators from './order.validation.js';
import { validation } from '../../middleware/validation.js';
import { auth } from '../../middleware/auth.middleware.js';
import { endPoints } from './order.roles.js';
const router = Router();

router.post('/', auth(endPoints.create), asyncHandler(orderController.createOrder));
export default router;