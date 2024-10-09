import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { GcpService } from "../gcp/gcp.service"; // Import GcpSecretService

@Injectable()
export class CustomConfigService extends ConfigService {
  private readonly logger = new Logger(CustomConfigService.name);

  constructor(private readonly gcpService: GcpService) {
    super();
    this.logger.log("CustomConfigService instantiated");
    this.logger.log(`GcpService injected: ${!!this.gcpService}`);
    this.logger.log(`GcpService type: ${typeof this.gcpService}`);
    this.logger.log(`GcpService methods: ${Object.keys(this.gcpService)}`);
  }

  async get(key: string): Promise<string | undefined> {
    this.logger.log(`Attempting to get value for key: ${key}`);

    // First, check environment variables
    const envValue = process.env[key];
    if (envValue) {
      this.logger.log(`Value found in environment variables for key: ${key}`);
      return envValue;
    }

    // If not found in environment, try fetching from GCP Secret Manager
    try {
      this.logger.log(`Fetching secret value for key: ${key}`);
      if (typeof this.gcpService.getSecretValue !== "function") {
        throw new Error(
          `getSecretValue is not a function. GcpService methods: ${Object.keys(
            this.gcpService,
          )}`,
        );
      }
      const secretValue = await this.gcpService.getSecretValue(key);
      if (secretValue) {
        this.logger.log(`Secret value found for key: ${key}`);
        return secretValue;
      }
    } catch (error) {
      this.logger.error(
        `Error retrieving key "${key}" from Secret Manager: ${
          (error as Error).message
        }`,
      );
    }

    // If not found in either place, return undefined
    this.logger.warn(`No value found for key: ${key}`);
    return undefined;
  }
}
