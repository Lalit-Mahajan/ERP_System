import express from "express";
import {
    getTrainings,
    addTraining,
    updateTraining,
    deleteTraining,
} from "../controllers/trainingController.js";

const router = express.Router();

router.get("/", getTrainings);
router.post("/add", addTraining);
router.put("/:id", updateTraining);
router.delete("/:id", deleteTraining);

export default router;