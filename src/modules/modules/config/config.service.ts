import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { GcpService } from "../gcp/gcp.service"; // Import GcpSecretService

@Injectable()
export class CustomConfigService extends ConfigService {
  private readonly logger = new Logger(CustomConfigService.name);

  constructor(private readonly gcpService: GcpService) {
    super();
  }

  async get(key: string): Promise<string | undefined> {
    // First, check environment variables
    const envValue = super.get(key);
    if (envValue) {
      return envValue;
    }

    // If not found, try fetching from GCP Secret Manager
    try {
      const secretValue = await this.gcpService.getSecretValue(key);
      return secretValue;
    } catch (error) {
      this.logger.error(
        `Error retrieving key "${key}" from Secret Manager: ${
          (error as Error).message
        }`,
      );
      return undefined;
    }
  }
}
