import express from "express";
import { loginController } from "../controllers/login.controller.js";
const router = express.Router();

router.post("/", loginController.authenticateUser);
router.put("/change/:userId", loginController.changePassword);

export default router;
