import { Router } from 'express'
import * as couponController from './coupon.controller.js'
const router = Router();

router.post('/', couponController.createCoupon)
router.get('/', couponController.getCoupons)

export default router;