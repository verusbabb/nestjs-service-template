import "reflect-metadata";
import helmet from "helmet";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { Logger, ValidationPipe } from "@nestjs/common";
import { AppModule } from "./modules/app.module";
import { setupSwagger } from "./shared/swagger";
import { Environment } from "./shared/types/index";
import nocache from "nocache";
import { CustomLogger } from "./modules/logger";
import {
  corsAllowedHeaders,
  corsConfig,
  corsMaxAge,
  corsMethods,
} from "./utils/cors";

async function bootstrap() {
  // await otelSDK.start();
  const appId = "Template";
  const logger = new Logger(`Verus ${appId}`);

  // Initialize GCP Secret Manager client
  const configService = new ConfigService();

  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const nodeEnv: Environment = configService.get("NODE_ENV") ?? Environment.DEV;
  // app.useLogger(app.get(CustomLogger));
  app.useLogger(logger);
  app.setGlobalPrefix("api");

  // Use the custom ConfigService
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  // Fetch port from GCP Secret Manager
  const port = (await configService.get("APP_EXAMPLE_SERVICE_PORT")) || 8110;

  app.use(nocache());

  app.enableCors({
    origin: corsConfig[nodeEnv],
    methods: corsMethods,
    allowedHeaders: corsAllowedHeaders,
    maxAge: corsMaxAge,
    credentials: true,
  });

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

  setupSwagger(app, appId);

  await app.listen(port, "0.0.0.0");
  logger.log(`Nest Service is running on: ${await app.getUrl()}`);
}

bootstrap();
