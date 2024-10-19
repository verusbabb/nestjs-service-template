import { LoggerService } from '@nestjs/common';
import { Logger } from '../../shared/logging/logger';

/* eslint-disable @typescript-eslint/no-explicit-any */
export class CustomLogger implements LoggerService {
  private finalContext(optionalParams: string | any[]) {
    let context = '';

    if (optionalParams.length === 1 && typeof optionalParams[0] === 'string') {
      context = optionalParams[0];
    } else if (optionalParams.length > 1) {
      context = optionalParams[optionalParams.length - 1];
    }
    return context;
  }

  private finalMessage(message: any, optionalParams: string | any[]) {
    let fullMessage = [message];
    if (optionalParams.length > 1 && typeof optionalParams[0] === 'string') {
      fullMessage = [optionalParams[0], JSON.stringify(message)];
    }
    return fullMessage;
  }

  log(message: any, ...optionalParams: any[]) {
    const context = this.finalContext(optionalParams);
    const fullMessage = this.finalMessage(message, optionalParams);

    Logger.info(`[${context}] ${fullMessage}`);
  }

  error(message: any, ...optionalParams: any[]) {
    const context = this.finalContext(optionalParams);
    const fullMessage = this.finalMessage(message, optionalParams);

    Logger.error(`[${context}] ${fullMessage}`);
  }

  warn(message: any, ...optionalParams: any[]) {
    const context = this.finalContext(optionalParams);
    const fullMessage = this.finalMessage(message, optionalParams);

    Logger.warn(`[${context}] ${fullMessage}`);
  }

  debug(message: any, ...optionalParams: any[]) {
    const context = this.finalContext(optionalParams);
    const fullMessage = this.finalMessage(message, optionalParams);

    Logger.debug(`[${context}] ${fullMessage}`);
  }
}
