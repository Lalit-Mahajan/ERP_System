import express from "express";
import { updateTeamsFromCSV } from "../controllers/updateController.js";

const router = express.Router();

router.post("/update-teams", updateTeamsFromCSV);

export default router;
