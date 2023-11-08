import { Router } from 'express';
import * as authController from './auth.controller.js';
import fileUpload, { fileValidation } from '../../services/multer.js';
const router = Router();

router.post('/signup', fileUpload(fileValidation.image).single('image'), authController.signup);
router.post('/signin', authController.signin);
router.get('/confirm-email/:token', authController.confirmEmail);

export default router;