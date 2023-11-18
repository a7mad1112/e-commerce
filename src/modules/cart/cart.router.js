import { Router } from "express";
import * as cartController from './cart.contoller.js';
import { auth } from "../../middleware/auth.middleware.js";
import { endPoints } from "./cart.roles.js";
const router = Router();

router.post('/', auth(endPoints.create), cartController.createCart);
router.patch('/remove-item', auth(endPoints.delete), cartController.removeItem);
export default router;