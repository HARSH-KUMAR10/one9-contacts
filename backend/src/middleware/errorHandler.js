import { logger } from "../logger/index.js";

export const errorHandler = (err, req, res, next) => {
  logger.error("Unhandled error", {
    message: err.message,
    url: req.url,
    method: req.method,
  });

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};

export const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
};
