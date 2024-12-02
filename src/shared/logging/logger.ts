import winston from "winston";
import { LoggingWinston } from "@google-cloud/logging-winston";
import { ConfigService } from "@nestjs/config";
import { getLogLevel, colors } from "./loggerConfig";

//add custom colors to winston Logging
winston.addColors(colors);

export const createLogger = (configService: ConfigService) => {
  const level = getLogLevel(configService);

  const transports: winston.transport[] = [new winston.transports.Console()];

  if (configService.get<string>("NODE_ENV") === "production") {
    transports.push(new LoggingWinston());
  }

  return winston.createLogger({
    level,
    levels: winston.config.npm.levels,
    format:
      configService.get<string>("NODE_ENV") === "production"
        ? winston.format.json() // JSON for structured logging in production
        : winston.format.combine(
            winston.format.colorize({ all: true }),
            winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
            winston.format.printf(
              ({ level, message, timestamp, ...metadata }) => {
                // Include any additional metadata in the log
                const metadataStr = Object.keys(metadata).length
                  ? ` ${JSON.stringify(metadata)}`
                  : "";
                return `${timestamp} [${level}]: ${message}${metadataStr}`;
              },
            ),
          ),
    transports,
  });
};

export const Logger = (configService: ConfigService) =>
  createLogger(configService);
