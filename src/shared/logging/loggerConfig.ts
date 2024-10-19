import { Environment } from "../types/template.enums";
import { isValueInStringEnum } from "./utils";

export enum LogLevel {
  ERROR = "error",
  WARN = "warn",
  INFO = "info",
  DEBUG = "debug",
}

export const DEFAULT_LOG_LEVEL = LogLevel.DEBUG;

export const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

export const colors = {
  error: "red",
  warn: "yellow",
  info: "blue",
  debug: "green",
};

export const getLogLevel = (env: typeof process.env): LogLevel => {
  console.log("env :>> ", env);
  const { NODE_ENV, LOG_LEVEL } = env;
  const key = NODE_ENV as Environment;

  const LEVELS: Record<Environment, LogLevel> = {
    [Environment.LOCAL]: LogLevel.DEBUG,
    [Environment.DEV]: LogLevel.DEBUG,
    [Environment.PROD]: LogLevel.DEBUG,
  };

  const isValueInLogLevel = isValueInStringEnum(LogLevel);
  const isValueInEnvironment = isValueInStringEnum(Environment);

  const validLogLevel = LOG_LEVEL ? isValueInLogLevel(LOG_LEVEL) : false;
  const validEnv = NODE_ENV ? isValueInEnvironment(NODE_ENV) : false;

  let level: LogLevel;
  if (validLogLevel) {
    level = LOG_LEVEL as LogLevel;
  } else {
    level = LEVELS[key] ?? DEFAULT_LOG_LEVEL;
  }

  console.log(`[verus-template] Logger Details:`, {
    "Environment Vars": { LOG_LEVEL, NODE_ENV },
    "Computed Vars": { key, validLogLevel, validEnv, level },
  });

  return level;
};
