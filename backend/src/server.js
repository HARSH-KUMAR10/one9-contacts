import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { config } from "./config/constants.js";
import { logger } from "./logger/index.js";
import { requestLogger } from "./middleware/requestLogger.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import { authMiddleware } from "./middleware/auth.js";
import authRoutes from "./routes/auth.js";
import contactRoutes from "./routes/contacts.js";
import interactionRoutes from "./routes/interactions.js";

const app = express();

// Middleware
app.use(
  cors({
    origin: config.cors.origin,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogger);

// Serve static files (frontend build)
app.use(express.static("frontend/dist"));

// Routes
app.use(`${config.api.prefix}/auth`, authRoutes);
app.use(`${config.api.prefix}/contacts`, authMiddleware, contactRoutes);
app.use(`${config.api.prefix}/interactions`, authMiddleware, interactionRoutes);

// Health check
app.get(`${config.api.prefix}/health`, (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Fallback to frontend
app.get(/(.*)/, (req, res) => {
  res.sendFile("frontend/dist/index.html", { root: "." });
});

// 404 Handler
app.use(notFoundHandler);

// Error Handler
app.use(errorHandler);

// Database Connection
const connectDB = async () => {
  try {
    await mongoose.connect(config.db.uri, {
      dbName: config.db.name,
    });
    logger.info("MongoDB connected successfully");
  } catch (error) {
    logger.error("MongoDB connection failed", { error: error.message });
    process.exit(1);
  }
};

// Start Server
const startServer = async () => {
  await connectDB();

  app.listen(config.port, config.host, () => {
    logger.info(`Server running at http://${config.host}:${config.port}`);
    logger.info(`Environment: ${config.env}`);
  });
};

startServer().catch((error) => {
  logger.error("Failed to start server", { error: error.message });
  process.exit(1);
});
