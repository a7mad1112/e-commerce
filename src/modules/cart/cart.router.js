import { Router } from "express";
import * as cartController from './cart.contoller.js';
import { auth } from "../../middleware/auth.middleware.js";
import { endPoints } from "./cart.roles.js";
const router = Router();

router.post('/', auth(endPoints.create), cartController.createCart);
export default router;