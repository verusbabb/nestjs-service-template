import { HttpModule } from "@nestjs/axios";
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { LoggerModule, LoggerMiddleware } from "./logger";
import { AppController } from "./app/app.controller";
import { AppService } from "./app/app.service";
import { GoogleCloudStorageModule } from "./gateways/storage/gcp-storage.module";
import { ExperimentalModule } from "./experimental/experimental.module";
import { GcpSecretsManagerModule } from "./secretsManager/secrets-manager.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV}`, ".env"],
      isGlobal: true,
    }),
    LoggerModule,
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
