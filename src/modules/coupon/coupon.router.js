import { Router } from 'express'
import * as couponController from './coupon.controller.js'
const router = Router();

router.post('/', couponController.createCoupon)
router.get('/', couponController.getCoupons)
router.put('/:id', couponController.updateCoupon)

export default router;