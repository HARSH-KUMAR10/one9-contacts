import { User } from "../models/User.js";
import { logger } from "../logger/index.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token =
      req.headers.authorization?.split(" ")[1] || req.cookies?.auth_token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - No token provided",
      });
    }

    // For now, we'll store token in memory (in production, use Redis or DB)
    // This is a simplified approach - in production use proper JWT
    req.userId = token; // In production: verify JWT and extract userId

    // Optionally validate user still exists
    // const user = await User.findById(userId);
    // if (!user) return res.status(401).json(...);

    next();
  } catch (error) {
    logger.error("Auth middleware error", { error: error.message });
    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};

export const optionalAuth = async (req, res, next) => {
  try {
    const token =
      req.headers.authorization?.split(" ")[1] || req.cookies?.auth_token;
    if (token) {
      req.userId = token;
    }
    next();
  } catch (error) {
    logger.error("Optional auth middleware error", { error: error.message });
    next();
  }
};
