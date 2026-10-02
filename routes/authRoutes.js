const express = require("express");
const bcrypt = require("bcryptjs");

const {
  registerUser,
  loginUser,
  getUsers,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

const User = require("../models/User");

const router = express.Router();

// ===============================
// REGISTER
// ===============================
router.post("/register", registerUser);

// ===============================
// LOGIN
// ===============================
router.post("/login", loginUser);

// ===============================
// GET ALL USERS - ADMIN ONLY
// ===============================
router.get("/users", protect, admin, getUsers);

// ===============================
// TEMPORARY ADMIN PASSWORD RESET
// ===============================
router.post("/reset-admin-password", async (req, res) => {
  try {
    const { secret } = req.body;

    if (secret !== process.env.ADMIN_RESET_SECRET) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    const hashedPassword = await bcrypt.hash("password@123", 10);

    const user = await User.findOneAndUpdate(
      { email: "admin@shopsphere.com" },
      {
        password: hashedPassword,
        role: "admin",
      },
      {
        new: true,
      }
    );

    if (!user) {
      return res.status(404).json({
        message: "Admin user not found",
      });
    }

    const passwordVerify = await bcrypt.compare(
      "password@123",
      user.password
    );

    res.json({
      message: "Admin password reset successfully",
      email: user.email,
      role: user.role,
      passwordVerify,
    });
  } catch (error) {
    console.error("ADMIN PASSWORD RESET ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;