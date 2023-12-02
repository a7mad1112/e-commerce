import { Router } from 'express'
import * as couponController from './coupon.controller.js'
import { asyncHandler } from '../../services/errorHandler.js';
const router = Router();

router.post('/', asyncHandler(couponController.createCoupon));
router.get('/', asyncHandler(couponController.getCoupons));
router.put('/:id', asyncHandler(couponController.updateCoupon));
router.patch('/soft-delete/:id', asyncHandler(couponController.softDelete));
router.patch('/restore/:id', asyncHandler(couponController.restore));
router.delete('/hard-delete/:id', asyncHandler(couponController.hardDelete));
export default router;