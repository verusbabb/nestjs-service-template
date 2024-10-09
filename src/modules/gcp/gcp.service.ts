import { Injectable, Logger } from "@nestjs/common";
import { SecretManagerServiceClient } from "@google-cloud/secret-manager";

@Injectable()
export class GcpService {
  private readonly logger = new Logger(GcpService.name);
  private client: SecretManagerServiceClient;

  constructor() {
    this.logger.log("GcpService instantiated");
    this.client = new SecretManagerServiceClient();
    console.log("this.client", this.client);
    this.logger.log(`GcpService methods: ${Object.keys(this)}`);
    this.logger.log(`getSecretValue type: ${typeof this.getSecretValue}`);
  }

  async getSecretValue(secretName: string): Promise<string | undefined> {
    this.logger.log(`getSecretValue called for secret: ${secretName}`);
    try {
      const [version] = await this.client.accessSecretVersion({
        name: `projects/${process.env.GCP_PROJECT_ID}/secrets/${secretName}/versions/latest`,
      });
      this.logger.log(`version: ${version}`);
      const secret = version.payload?.data?.toString();
      return secret || undefined;
    } catch (error) {
      this.logger.error(
        `Failed to fetch secret ${secretName}: ${(error as Error).message}`,
      );
      return undefined;
    }
  }
}
