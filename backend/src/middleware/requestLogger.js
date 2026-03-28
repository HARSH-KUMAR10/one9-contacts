import { logger } from "../logger/index.js";

export const requestLogger = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    logger.http(req.method, req.url, res.statusCode, duration);
  });

  next();
};
