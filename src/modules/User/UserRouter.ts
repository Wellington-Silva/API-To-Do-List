import { Router } from "express";
import UserController from "./UserController";
import authMiddleware from "../../middleware/authMiddleware";

const router = Router();

router.get("/:id", authMiddleware, UserController.getUserById);
router.post("/", UserController.createUser);
router.put("/:id", authMiddleware, UserController.updateProfile);
router.delete("/:id", authMiddleware, UserController.deleteAccount);

export default router;