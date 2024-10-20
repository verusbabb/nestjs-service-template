import { Module } from "@nestjs/common";
import { CustomLogger } from "./logger.service";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: CustomLogger,
      useFactory: (configService: ConfigService) =>
        new CustomLogger(configService),
      inject: [ConfigService],
    },
  ],
  exports: [CustomLogger], // Export for use in other modules
})
export class LoggerModule {}
