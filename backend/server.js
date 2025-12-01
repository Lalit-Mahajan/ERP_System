// backend/server.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import db from "./config/db.js";
dotenv.config();

import authRoutes from "./routes/authRoutes.js";
import renewalRoutes from "./routes/renewalRoutes.js";
import trainingRoutes from "./routes/trainingRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import productRoutes from "./routes/productRoutes.js"
import updateRoutes from "./routes/updateRoutes.js"

const app = express();
app.use(cors());
app.use(bodyParser.json());

db.connect((err) => {
    if (err) {
        console.error("❌ Database connection failed:", err);
    } else {
        console.log("✅ Connected to MySQL database:", process.env.DB_NAME);
    }
});

app.use("/api/auth", authRoutes);
app.use("/api/renewal", renewalRoutes);
app.use("/api/training", trainingRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/products", productRoutes);
app.use("/api/update", updateRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
