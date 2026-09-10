// backend/src/app.js
import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";

const app = express();

app.use(cors({
    origin: true,
    credentials: true,
}));

app.use(express.json());

// ✅ ONLY auth routes
app.use("/api/auth", authRouter);

app.get("/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});

export default app;