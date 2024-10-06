import { HttpModule } from "@nestjs/axios";
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AppController } from "./app/app.controller";
import { AppService } from "./app/app.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // load: [envConfig] TODO: Add env variables
    }),
    HttpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // https://docs.nestjs.com/middleware#excluding-routes
  }
}
