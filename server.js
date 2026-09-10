import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./src/routes/auth.routes.js";

dotenv.config();

const app = express();

// ✅ Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// ✅ ADD THIS: Log all incoming requests
// app.use((req, res, next) => {
//     console.log(`📥 ${req.method} ${req.url}`);
//     console.log(`📦 Body:`, req.body);
//     next();
// });

// ✅ Routes
app.use("/api/auth", authRouter);

app.get("/health", (req, res) => {
    console.log("🏥 Health check requested");
    res.json({ status: "ok", message: "Server is running" });
});

// ✅ MongoDB Connection
const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB Connected");
        app.listen(PORT, "0.0.0.0", () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
            console.log(`📡 Health: http://localhost:${PORT}/health`);
            console.log(`🔗 Listening on all network interfaces (0.0.0.0)`);
        });
    })
    .catch((err) => {
        console.error("❌ MongoDB error:", err);
        process.exit(1);
    });