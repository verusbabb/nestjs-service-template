import "reflect-metadata";
import helmet from "helmet";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { Logger, ValidationPipe } from "@nestjs/common";
import { envConfig } from "./utils/env.config";
import { AppModule } from "./modules/app.module";

async function bootstrap() {
  const appId = "Template";
  const logger = new Logger(`Verus ${appId}`);

  // Initialize GCP Secret Manager client
  const configService = new ConfigService();

  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  // Use the custom ConfigService
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  // Fetch port from GCP Secret Manager
  const port = (await configService.get("APP_EXAMPLE_SERVICE_PORT")) || 8110;

  app.useLogger(logger);
  envConfig();

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
  logger.log(`Nest Service is running on: ${await app.getUrl()}`);
}

bootstrap();
