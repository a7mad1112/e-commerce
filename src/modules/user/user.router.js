import { Router } from "express";
import { auth } from './../../middleware/auth.middleware.js';
import { roles } from './../../roles.js';
import * as userController from './user.controller.js';
import { asyncHandler } from './../../utils/errorHandler.js';
const router = Router();

router.get('/profile', auth(Object.values(roles)),
  asyncHandler(userController.getProfile));
export default router;