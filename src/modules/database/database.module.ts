import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>("MONGO_URI"),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}