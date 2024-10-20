import { ConfigService } from "@nestjs/config";

export enum LogLevel {
  ERROR = "error",
  WARN = "warn",
  INFO = "info",
  DEBUG = "debug",
}

export const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  debug: "blue",
};

export const getLogLevel = (configService: ConfigService): string => {
  const nodeEnv = configService.get<string>("NODE_ENV", "development");
  return nodeEnv === "production" ? "error" : "debug";
};
