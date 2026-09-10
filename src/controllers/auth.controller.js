import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const register = async (req, res) => {
    try {
        const { username, email, password, fullName } = req.body;

        console.log("📝 Register:", email);

        const existing = await userModel.findOne({ $or: [{ email }, { username }] });
        if (existing) {
            return res.status(409).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            username,
            email,
            password: hashedPassword,
            fullName: fullName || username,
        });

        const token = jwt.sign(
            { id: user._id, email: user.email },
            config.JWT_SECRET,
            { expiresIn: "7d" }
        );

        console.log("✅ User registered:", email);

        res.status(201).json({
            message: "Registered successfully",
            user: user.toJSON(),
            token,
        });

    } catch (error) {
        console.error("❌ Register error:", error);
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log("🔑 Login:", email);

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            config.JWT_SECRET,
            { expiresIn: "7d" }
        );

        console.log("✅ Login successful:", email);

        res.json({
            message: "Login successful",
            user: user.toJSON(),
            token,
        });

    } catch (error) {
        console.error("❌ Login error:", error);
        res.status(500).json({ message: error.message });
    }
};

export const getMe = async (req, res) => {
    try {
        const user = await userModel.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ user: user.toJSON() });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};