import { Module } from "@nestjs/common";
import {
  ConfigModule as NestConfigModule,
  ConfigService,
} from "@nestjs/config";
import { GcpModule } from "../gcp/gcp.module"; // Import the GcpModule
import { CustomConfigService } from "./config.service";

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true, // Make ConfigModule global so that ConfigService is available everywhere
    }),
    GcpModule, // Import GcpModule to use GcpService within CustomConfigService
  ],
  providers: [
    {
      provide: ConfigService,
      useClass: CustomConfigService, // Provide the CustomConfigService as the default ConfigService
    },
    CustomConfigService,
  ],
  exports: [ConfigService, CustomConfigService], // Export ConfigService for other modules
})
export class ConfigModule {}
