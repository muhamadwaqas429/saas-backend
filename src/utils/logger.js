import fs from "fs";
import path from "path";

const logsDir = path.join(process.cwd(), "logs");

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

export const writeLog = (type, message, meta = {}) => {
  const date = new Date().toISOString().split("T")[0];
  const filePath = path.join(logsDir, `${date}.log`);

  const log = {
    time: new Date().toISOString(),
    type,
    message,
    ...meta,
  };

  fs.appendFileSync(filePath, JSON.stringify(log) + "\n");
};
