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
    this.logger.info(message, ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    this.logger.error(message, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    this.logger.warn(message, ...optionalParams);
  }

  debug(message: any, ...optionalParams: any[]) {
    this.logger.debug(message, ...optionalParams);
  }
}
