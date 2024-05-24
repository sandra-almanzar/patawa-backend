import express from "express";
import { walkController } from "../controllers/walk.controller.js";
import userExtractor from "../../middleware/userExtractor.js";

const router = express.Router();

router.post("/details", userExtractor, walkController.createWalkDetail);
router.get("/details", userExtractor, walkController.getAllWalksDetails);
router.get("/details/:id", userExtractor, walkController.getWalkDetailById);
router.put("/details/:id", userExtractor, walkController.updateWalkDetail);
router.delete("/details/:id", userExtractor, walkController.deleteWalkDetail);
router.get("/", userExtractor, walkController.getAllWalks);
router.post("/", userExtractor, walkController.createWalk);
router.get("/:id", userExtractor, walkController.getWalkById);
router.put("/:id", userExtractor, walkController.updateWalk);
router.delete("/:id", userExtractor, walkController.deleteWalk);

export default router;
