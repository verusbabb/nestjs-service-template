import { Injectable } from "@nestjs/common";
import { SecretManagerServiceClient } from "@google-cloud/secret-manager";
import { getSecret } from "../../utils";

@Injectable()
export class GcpSecretsManagerService {
  private readonly client = new SecretManagerServiceClient();
  private readonly projectId = getSecret("GOOGLE_PROJECT_ID");

  async loadSecretVersion(
    secretName: string,
    version: string,
  ): Promise<string> {
    const [secretVersion] = await this.client.accessSecretVersion({
      name: `projects/${this.projectId}/secrets/${secretName}/versions/${version}`,
    });

    const secretData = secretVersion.payload?.data?.toString();
    if (!secretData) {
      throw new Error("Secret data is undefined");
    }
    return secretData;
  }
}
