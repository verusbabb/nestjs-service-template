import { Module } from "@nestjs/common";
import { ConfigModule as NestConfigModule } from "@nestjs/config";
import { GcpModule } from "../gcp/gcp.module";
import { CustomConfigService } from "./config.service";
import { GcpService } from "../gcp/gcp.service";

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
    }),
    GcpModule,
  ],
  providers: [
    {
      provide: CustomConfigService,
      useFactory: (gcpService: GcpService) =>
        new CustomConfigService(gcpService),
      inject: [GcpService],
    },
  ],
  exports: [CustomConfigService],
})
export class ConfigModule {}
