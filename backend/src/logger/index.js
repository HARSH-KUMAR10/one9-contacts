import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const logsDir = path.join(__dirname, "../../logs");

// Ensure logs directory exists
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const LOG_LEVELS = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

const currentLogLevel =
  LOG_LEVELS[process.env.LOG_LEVEL || "info"] || LOG_LEVELS.info;

const getTimestamp = () => {
  const now = new Date();
  return now.toISOString().substring(11, 19);
};

const formatLog = (level, message, data = null) => {
  const timestamp = getTimestamp();
  const prefix = `[${timestamp}] [${level.toUpperCase()}]`;

  if (data) {
    return `${prefix} ${message} ${JSON.stringify(data)}`;
  }
  return `${prefix} ${message}`;
};

const writeLog = (level, message, data = null) => {
  if (LOG_LEVELS[level] > currentLogLevel) return;

  const logMessage = formatLog(level, message, data);

  // Console output
  if (level === "error") {
    console.error(logMessage);
  } else if (level === "warn") {
    console.warn(logMessage);
  } else {
    console.log(logMessage);
  }

  // File output
  const logFile = path.join(logsDir, `${level}.log`);
  fs.appendFileSync(logFile, logMessage + "\n");
};

export const logger = {
  error: (message, data) => writeLog("error", message, data),
  warn: (message, data) => writeLog("warn", message, data),
  info: (message, data) => writeLog("info", message, data),
  debug: (message, data) => writeLog("debug", message, data),

  http: (method, url, status, ms) => {
    const logMessage = `${method} ${url} - ${status} (${ms}ms)`;
    writeLog("info", logMessage);
  },
};
