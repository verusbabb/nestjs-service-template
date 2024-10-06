import { Module, MiddlewareConsumer, NestModule } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { AppController } from "./app/app.controller";
import { AppService } from "./app/app.service";
import { GcpModule } from "./modules/gcp/gcp.module";
import { ConfigModule } from "./modules/config/config.module"; // Import your custom ConfigModule

@Module({
  imports: [
    ConfigModule, // Your custom ConfigModule that uses CustomConfigService
    HttpModule,
    GcpModule, // GCP-related logic
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // https://docs.nestjs.com/middleware#excluding-routes
  }
}
