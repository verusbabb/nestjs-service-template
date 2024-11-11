import { Injectable } from "@nestjs/common";
import { SecretManagerServiceClient } from "@google-cloud/secret-manager";
import { ConfigService } from "@nestjs/config";
import { Logger } from "@nestjs/common";

@Injectable()
export class GcpSecretsManagerService {
  private readonly client = new SecretManagerServiceClient();
  private readonly logger = new Logger(GcpSecretsManagerService.name);
  // private readonly projectId = getSecret("GOOGLE_PROJECT_ID");

  constructor(private readonly configService: ConfigService) {}

  async loadSecretVersion(
    secretName: string,
    version: string,
  ): Promise<string> {
    try {
      this.logger.log("Loading secret version", { secretName, version });
      const projectId = this.configService.get("GOOGLE_PROJECT_ID");
      const [secretVersion] = await this.client.accessSecretVersion({
        name: `projects/${projectId}/secrets/${secretName}/versions/${version}`,
      });

      const secretData = secretVersion.payload?.data?.toString();
      if (!secretData) {
        throw new Error("Secret data is undefined");
      }
      return secretData;
    } catch (error) {
      throw new Error(
        `Failed to load secret '${secretName}' version '${version}': ${error.message}`,
      );
    }
  }
}
