import { Module } from "@nestjs/common";
import { ExperimentalService } from "./experimental.service";
import { ExperimentalController } from "./experimental.controller";
import { GcpSecretsManagerService } from "../secretsManager/secrets-manager.service";

@Module({
  controllers: [ExperimentalController],
  providers: [ExperimentalService, GcpSecretsManagerService],
})
export class ExperimentalModule {}
