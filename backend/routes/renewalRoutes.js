// backend/routes/renewalRoutes.js
import express from "express";
import {
    getRenewals,
    addRenewal,
    updateRenewal,
    deleteRenewal,
} from "../controllers/renewalController.js";

const router = express.Router();

router.get("/", getRenewals); // GET all
router.post("/add", addRenewal); // POST new
router.put("/:id", updateRenewal); // UPDATE existing
router.delete("/:id", deleteRenewal); // DELETE

export default router;
