import { Module } from "@nestjs/common";
import { ExperimentalService } from "./experimental.service";
import { ExperimentalController } from "./experimental.controller";
import { ConfigModule } from "../config/config.module";

@Module({
  imports: [ConfigModule],
  controllers: [ExperimentalController],
  providers: [ExperimentalService],
})
export class ExperimentalModule {}
