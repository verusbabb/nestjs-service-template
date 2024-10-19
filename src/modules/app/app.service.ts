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

  async healthCheck(): Promise<string> {
    this.logger.log("[healthCheck]");

    try {
      // Check service name from environment
      const serviceName = this.configService.get<string>("FRIENDLY_NAME");

      return `${serviceName} is Alive and Healthy`;
    } catch (e) {
      this.logger.error(e.message);
      throw new InternalServerErrorException("Health check failed");
    }
  }
}
