import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { CustomLogger } from "./logger.service";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: CustomLogger) {}

  use(req: Request, res: Response, next: NextFunction) {
    res.on("finish", () => {
      const { method, originalUrl } = req;
      const { statusCode } = res;

      const message = `${method} ${originalUrl} ${statusCode}`;
      if (statusCode >= 500) {
        this.logger.error(message);
      } else if (statusCode >= 400) {
        this.logger.warn(message);
      } else {
        this.logger.log(message);
      }
    });

    next();
  }
}
