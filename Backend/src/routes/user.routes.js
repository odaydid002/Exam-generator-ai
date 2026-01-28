import { Router } from "express";
import { getAllUsers, getProfile } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", getAllUsers);
router.get("/profile", authMiddleware, getProfile);

export default router;
