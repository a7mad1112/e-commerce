import { Router } from 'express'
import * as couponController from './coupon.controller.js'
const router = Router();

router.post('/', couponController.createCoupon)
router.get('/', couponController.getCoupons)
router.put('/:id', couponController.updateCoupon)
router.patch('/soft-delete/:id', couponController.softDelete)
export default router;