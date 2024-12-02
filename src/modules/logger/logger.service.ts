/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, LoggerService } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createLogger } from "../../shared/logging";

@Injectable()
export class CustomLogger implements LoggerService {
  private readonly logger;

  constructor(private readonly configService: ConfigService) {
    this.logger = createLogger(this.configService);
  }

  log(message: any, ...optionalParams: any[]) {
    const metadata = optionalParams.length ? optionalParams[0] : {};
    this.logger.info(message, metadata);
  }

  error(message: any, ...optionalParams: any[]) {
    const metadata = optionalParams.length ? optionalParams[0] : {};
    this.logger.error(message, metadata);
  }

  warn(message: any, ...optionalParams: any[]) {
    const metadata = optionalParams.length ? optionalParams[0] : {};
    this.logger.warn(message, metadata);
  }

  debug(message: any, ...optionalParams: any[]) {
    const metadata = optionalParams.length ? optionalParams[0] : {};
    this.logger.debug(message, metadata);
  }
}
