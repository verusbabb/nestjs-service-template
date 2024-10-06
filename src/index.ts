import "reflect-metadata";

import helmet from "helmet";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { Logger, ValidationPipe } from "@nestjs/common";

import { AppModule } from "./modules/app.module";

async function bootstrap() {
  const app_id = "Template";
  const logger = new Logger(`Verus ${app_id}`);
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const configService = app.get(ConfigService);
  const port = configService.get("APP_EXAMPLE_SERVICE_PORT") || 8110; // TODO: replace with correct values and then remove the TODO

  app.useLogger(logger);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true, // this will strip away any extra keys in the request DTOs
    }),
  );

  app.use(
    helmet({
      hsts: { maxAge: 31536000 },
      frameguard: { action: "deny" },
      contentSecurityPolicy: {
        directives: {
          "default-src": ["'self'"],
          "frame-ancestors": ["'none'"],
        },
      },
    }),
  );

  await app.listen(port, "0.0.0.0");
  logger.log(`Nest Service'} is running on: ${await app.getUrl()}`);
}

bootstrap();
