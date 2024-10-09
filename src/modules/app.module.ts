import { Module, MiddlewareConsumer, NestModule } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { AppController } from "./app/app.controller";
import { AppService } from "./app/app.service";
import { GcpModule } from "./gcp/gcp.module";
import { ConfigModule } from "./config/config.module"; // Import your custom ConfigModule
import { ExperimentalModule } from "./experimental/experimental.module";

@Module({
  imports: [
    ConfigModule, // Custom ConfigModule that uses CustomConfigService
    HttpModule,
    GcpModule,
    ExperimentalModule, // GCP-related logic
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
