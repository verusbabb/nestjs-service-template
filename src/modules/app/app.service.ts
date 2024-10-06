import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AppService {
  constructor(protected readonly configService: ConfigService) {}

  private readonly logger = new Logger(AppService.name);

  // async pingDatabase(): Promise<boolean> {
  //   this.logger.debug('[pingDatabase]');
  //   const database_check = await getDatabaseConnection();
  //   return database_check ? true : false;
  // }

  async healthCheck(): Promise<{ status: string }> {
    this.logger.debug("[healthCheck]");
    try {
      console.log("health check");
      return { status: "ok" };
    } catch (e) {
      this.logger.error("Health check failed", e);
      throw new InternalServerErrorException("Health check failed");
    }
  }
}
