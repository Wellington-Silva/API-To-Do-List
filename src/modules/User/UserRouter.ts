import { Router } from "express";
import UserController from "./UserController";
import authMiddleware from "../../middleware/authMiddleware";

const router = Router();

router.get("/", authMiddleware, UserController.getUserById);
router.post("/", UserController.createUser);
router.put("/", authMiddleware, UserController.updateProfile);
router.delete("/", authMiddleware, UserController.deleteAccount);

export default router;