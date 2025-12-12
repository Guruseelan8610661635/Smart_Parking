const express = require("express");
const router = express.Router();
const User = require("../models/user");
const authMiddleware = require("../middleware/authMiddleware");

// GET /api/user/profile - Only logged-in users
router.get("/profile", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/user/vehicle - Return vehicle details
router.get("/vehicle", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({
            vehicleNumber: user.vehicleNumber,
            vehicleType: user.vehicleType
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

// GET /api/user/user-only - route accessible only by regular users (role === 'user')
router.get("/user-only", authMiddleware, async (req, res) => {
    try {
        if (!req.user || req.user.role !== "user") {
            return res.status(403).json({ message: "Access denied. Users only route." });
        }

        const user = await User.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({ message: "User access granted", user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
