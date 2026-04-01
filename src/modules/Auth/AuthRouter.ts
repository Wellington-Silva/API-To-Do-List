import { Router } from "express";
import AuthController from "./AuthController";
import authMiddleware from "../../middleware/authMiddleware";

const router = Router();

router.post("/login", AuthController.login);
router.post("/logout", authMiddleware, AuthController.logout);

export default router;