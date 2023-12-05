import { Router } from "express";
import * as cartController from './cart.contoller.js';
import { auth } from "../../middleware/auth.middleware.js";
import { endPoints } from "./cart.roles.js";
import { asyncHandler } from "../../utils/errorHandler.js";
const router = Router();

router.post('/', auth(endPoints.create), asyncHandler(cartController.createCart));
router.patch('/remove-item', auth(endPoints.delete), asyncHandler(cartController.removeItem));
router.patch('/clear', auth(endPoints.clear), asyncHandler(cartController.clearCart));
router.get('/', auth(endPoints.get), asyncHandler(cartController.getCart));
export default router;