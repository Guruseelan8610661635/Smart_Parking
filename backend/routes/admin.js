const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/admin");
const User = require("../models/user");
 
router.get("/dashboard", authMiddleware, adminMiddleware, (req, res) => {
    res.json({ message: "Welcome Admin! You have full access." });
});

router.post("/add-slot", authMiddleware, adminMiddleware, (req, res) => {
    try {
        const { slotNumber, location, isAvailable } = req.body;
        if (!slotNumber || !location) {
            return res.status(400).json({ message: "slotNumber and location required" });
        }
        res.json({
            message: "Parking slot added successfully",
            slot: { slotNumber, location, isAvailable: isAvailable !== false }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
 
module.exports = router;

// GET /api/admin/users - return all users (admin only)
router.get(
    "/users",
    authMiddleware,
    adminMiddleware,
    async (req, res) => {
        try {
            const users = await User.find().select("-password");
            res.json({ users });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
);