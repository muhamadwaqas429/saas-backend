import fs from "fs";
import path from "path";

/**
 * Log directory and file
 */
const LOG_DIR = path.resolve("logs");
const LOG_FILE = path.join(LOG_DIR, "auth.log");

/**
 * Ensure log directory exists
 */
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

/**
 * Write log safely (non-blocking)
 * @param {string} action - login | logout | register
 * @param {string} message
 * @param {object} meta
 */
export const writeLog = (action, message, meta = {}) => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    action,
    message,
    ...meta,
  };

  fs.appendFile(
    LOG_FILE,
    JSON.stringify(logEntry) + "\n",
    { encoding: "utf8" },
    (err) => {
      if (err) {
        // Logging errors should NEVER crash the app
        console.error("Log write failed:", err.message);
      }
    }
  );
};
