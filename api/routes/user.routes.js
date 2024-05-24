import express from "express";
import { userController } from "../controllers/user.controller.js";
import userExtractor from "../../middleware/userExtractor.js";
const router = express.Router();

router.post("/detail", userExtractor, userController.createUserWithDetails);
router.put("/detail/:id", userExtractor, userController.updateUserWithDetails);
router.get("/", userExtractor, userController.getAllUsers);
router.post("/", userExtractor, userController.createUser);
router.get("/:id", userExtractor, userController.getUserById);
router.put("/:id", userExtractor, userController.updateUser);
router.delete("/:id", userExtractor, userController.deleteUser);
router.get("/role/:roleName", userExtractor, userController.getUsersByRole);

export default router;
