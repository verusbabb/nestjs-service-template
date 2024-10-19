import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from "@nestjs/config";
import { Test } from "@nestjs/testing";
import { CustomLoggerModule } from "../modules/logger/logger.module";
import { envConfig } from "../utils/env.config";

import { AppController } from "./app/app.controller";
import { AppService } from "./app/app.service";

export const SharedTestingModule = Test.createTestingModule({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envConfig],
    }),
    CustomLoggerModule,
    HttpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
}).compile();
