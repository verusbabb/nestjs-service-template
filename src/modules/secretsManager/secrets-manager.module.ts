import { Module } from "@nestjs/common";
import { GcpSecretsManagerService } from "./secrets-manager.service";

@Module({
  providers: [GcpSecretsManagerService],
  exports: [GcpSecretsManagerService], // Make the service accessible to other modules
})
export class GcpSecretsManagerModule {}
