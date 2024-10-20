import "reflect-metadata";
import helmet from "helmet";
import { NestFactory } from "@nestjs/core";
import { Logger, ValidationPipe } from "@nestjs/common";
import { AppModule } from "./modules/app.module";
import { setupSwagger } from "./shared/swagger";
import nocache from "nocache";
import { CustomLogger } from "./modules/logger";
import {
  corsAllowedHeaders,
  corsConfig,
  corsMaxAge,
  corsMethods,
} from "./utils/cors";
import { ConfigService } from "@nestjs/config";

// Add this line near the top of the file, after the imports
const nodeEnv = process.env.NODE_ENV || "development";

async function bootstrap() {
  const appId = "Template";

  // Create the application instance without custom logger initially
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  // Get ConfigService from the app context
  const configService = app.get(ConfigService);

  // Create CustomLogger with ConfigService
  const logger = new CustomLogger(configService);

  // Set the logger after creation
  app.useLogger(logger);
  app.setGlobalPrefix("api");

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  // Fetch port from ConfigService
  const port = configService.get("APP_EXAMPLE_SERVICE_PORT") || 8110;

  app.use(nocache());

  app.enableCors({
    origin: corsConfig[nodeEnv as keyof typeof corsConfig],
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
