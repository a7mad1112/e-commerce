import { Router } from 'express';
import * as authController from './auth.controller.js';
import fileUpload, { fileValidation } from '../../utils/multer.js';
import { asyncHandler } from '../../utils/errorHandler.js';
const router = Router();

router.post('/signup', fileUpload(fileValidation.image).single('image'), asyncHandler(authController.signup));
router.post('/signin', asyncHandler(authController.signin));
router.get('/confirm-email/:token', asyncHandler(authController.confirmEmail));
router.patch('/send-code', asyncHandler(authController.sendCode));
router.patch('/forgot-password', asyncHandler(authController.forgotPassword));

export default router;