import { Router } from 'express'
import * as couponController from './coupon.controller.js'
const router = Router();

router.post('/', couponController.createCoupon)
router.get('/', couponController.getCoupons)
router.put('/:id', couponController.updateCoupon)
router.patch('/soft-delete/:id', couponController.softDelete)
router.patch('/restore/:id', couponController.restore)
router.delete('/hard-delete/:id', couponController.hardDelete)
export default router;