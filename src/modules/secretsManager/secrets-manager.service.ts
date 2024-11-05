import { Injectable } from "@nestjs/common";
import { SecretManagerServiceClient } from "@google-cloud/secret-manager";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class GcpSecretsManagerService {
  private readonly client = new SecretManagerServiceClient();
  // private readonly projectId = getSecret("GOOGLE_PROJECT_ID");

  constructor(private readonly configService: ConfigService) {}

  async loadSecretVersion(
    secretName: string,
    version: string,
  ): Promise<string> {
    const projectId = this.configService.get("GOOGLE_PROJECT_ID");
    const [secretVersion] = await this.client.accessSecretVersion({
      name: `projects/${projectId}/secrets/${secretName}/versions/${version}`,
    });

    const secretData = secretVersion.payload?.data?.toString();
    if (!secretData) {
      throw new Error("Secret data is undefined");
    }
    return secretData;
  }
}
