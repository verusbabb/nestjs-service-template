import winston from "winston";
import { context, Span, trace } from "@opentelemetry/api";
import { LoggingWinston } from "@google-cloud/logging-winston";
import { Environment } from "../types/template.enums";
import { colors, getLogLevel, levels } from "./loggerConfig";
import { envConfig } from "../../utils/env.config";

const env = envConfig();
const NODE_ENV = env;
const level = getLogLevel(process.env);

const loggingWinston = new LoggingWinston();
const transports: winston.transport[] = [];

if (NODE_ENV !== Environment.LOCAL) {
  transports.push(loggingWinston);
} else {
  transports.push(new winston.transports.Console());
}

export const getOrCreateSpan = (): Span => {
  let span = trace.getSpan(context.active());

  if (!span) {
    span = trace.getTracer("default").startSpan("default-span");
  }

  return span;
};

const tracingFormat = function () {
  return winston.format((info) => {
    const span = getOrCreateSpan();
    if (span) {
      const { traceId, spanId } = span.spanContext();
      info["traceId"] = traceId;
      info["spanId"] = spanId;
    }
    return info;
  })();
};

let format;
if (NODE_ENV === Environment.LOCAL) {
  format = winston.format.combine(
    winston.format.align(),
    winston.format.splat(),
    winston.format.errors({ stack: true }),
    winston.format.colorize({ all: true }),
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
    winston.format.printf((info) => {
      const logMessage = `[${info.timestamp}] [${info.level}]: ${info.message}`;
      return info.stack ? `${logMessage}\n${info.stack}` : logMessage;
    }),
  );
  console.log(" if format :>> ", format);
} else {
  format = winston.format.combine(
    winston.format.splat(),
    winston.format.errors({ stack: true }),
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
    tracingFormat(),
    winston.format.json({ circularValue: "[Circular]" }),
  );
  console.log(" else format :>> ", format);
}

winston.addColors(colors);

// Create the logger
export const Logger = winston.createLogger({
  level,
  levels,
  format,
  transports,
});
