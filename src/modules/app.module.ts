import { HttpModule } from "@nestjs/axios";
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CustomLoggerModule, LoggerMiddleware } from "./logger";
import { envConfig } from "../utils/env.config";
import { AppController } from "./app/app.controller";
import { AppService } from "./app/app.service";
import { GoogleCloudStorageModule } from "./gateways/storage/gcp-storage.module";
// import { APP_GUARD } from "@nestjs/core";
// import { RolesGuard } from "../middleware/guards/roles.guard";
import { ExperimentalModule } from "./experimental/experimental.module";
import { GcpSecretsManagerModule } from "./secretsManager/secrets-manager.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => ({ env: envConfig() })],
    }),
    CustomLoggerModule,
    HttpModule,
    GoogleCloudStorageModule,
    ExperimentalModule,
    GcpSecretsManagerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
