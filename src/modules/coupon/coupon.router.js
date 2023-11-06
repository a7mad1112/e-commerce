import { Router } from 'express'
import * as couponController from './coupon.controller.js'
const router = Router();

router.post('/', couponController.createCoupon)

export default router;