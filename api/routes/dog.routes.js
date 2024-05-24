import express from "express";
import { dogController } from "../controllers/dog.controller.js";
import userExtractor from "../../middleware/userExtractor.js";

const router = express.Router();

router.get("/", userExtractor, dogController.getAllDogs);
router.post("/", userExtractor, dogController.createDog);
router.get("/:id", userExtractor, dogController.getDogById);
router.put("/:id", userExtractor, dogController.updateDog);
router.delete("/:id", userExtractor, dogController.deleteDog);

export default router;
