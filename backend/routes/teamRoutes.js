import express from "express";
import {
    getTeam,
    addTeam,
    updateTeam,
    deleteTeam,
} from "../controllers/teamController.js";

const router = express.Router();

router.get("/", getTeam);
router.post("/add", addTeam);
router.put("/:id", updateTeam);
router.delete("/:id", deleteTeam);

export default router;