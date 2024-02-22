import { createLogger, format, transports } from "winston";

const logger = createLogger({
  level: "debug",
  format: format.combine(
    format.colorize(),
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.printf(
      (info) =>
        `[Category service: ${info.timestamp as string}] ${info.level}: ${info.message}`,
    ),
    format.errors({ stack: true }),
    format.splat(),
  ),
  transports: [new transports.Console()],
});

export default logger;
