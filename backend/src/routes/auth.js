import express from "express";
import { authController } from "../controllers/AuthController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.post("/request-otp", (req, res) => authController.requestOTP(req, res));
router.post("/verify-otp", (req, res) => authController.verifyOTP(req, res));

// Protected routes
router.post("/logout", authMiddleware, (req, res) =>
  authController.logout(req, res),
);
router.get("/me", authMiddleware, (req, res) => authController.getMe(req, res));

export default router;
