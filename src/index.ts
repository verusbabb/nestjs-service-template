import "reflect-metadata";
import helmet from "helmet";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { Logger, ValidationPipe } from "@nestjs/common";
import { SecretManagerServiceClient } from "@google-cloud/secret-manager";

import { AppModule } from "./modules/app.module";

async function bootstrap() {
  const app_id = "Template";
  const logger = new Logger(`Verus ${app_id}`);

  // Initialize GCP Secret Manager client
  const secretManager = new SecretManagerServiceClient();

  // Create a custom ConfigService that uses GCP Secret Manager
  const configService = new ConfigService(async (key: string) => {
    try {
      const [version] = await secretManager.accessSecretVersion({
        name: `projects/${process.env.GCP_PROJECT_ID}/secrets/${key}/versions/latest`,
      });
      return version?.payload?.data?.toString();
    } catch (error) {
      if (error instanceof Error) {
        logger.error(`Failed to fetch secret ${key}: ${error.message}`);
      } else {
        logger.error(`Failed to fetch secret ${key}: ${String(error)}`);
      }
      return undefined;
    }
  });

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
