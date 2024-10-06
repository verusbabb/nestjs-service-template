import { Injectable, Logger } from "@nestjs/common";
import { SecretManagerServiceClient } from "@google-cloud/secret-manager";

@Injectable()
export class GcpService {
  private readonly logger = new Logger(GcpService.name);
  private client: SecretManagerServiceClient;

  constructor() {
    // Initialize the Google Cloud Secret Manager client
    this.client = new SecretManagerServiceClient();
  }

  async getSecretValue(secretName: string): Promise<string | undefined> {
    try {
      const [version] = await this.client.accessSecretVersion({
        name: `projects/${process.env.GCP_PROJECT_ID}/secrets/${secretName}/versions/latest`,
      });
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
