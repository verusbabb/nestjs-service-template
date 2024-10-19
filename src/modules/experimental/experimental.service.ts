import { Injectable, Logger } from "@nestjs/common";
import { CreateExperimentalDto } from "./dto/create-experimental.dto";
import { UpdateExperimentalDto } from "./dto/update-experimental.dto";
import { GcpSecretsManagerService } from "../secretsManager/secrets-manager.service";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ExperimentalService {
  private readonly logger = new Logger(ExperimentalService.name);

  constructor(
    // private readonly configService: ConfigService,
    private readonly gcpSecretsManagerService: GcpSecretsManagerService,
    private readonly configService: ConfigService,
  ) {}

  async getSecretValue(): Promise<string> {
    this.logger.log("getSecretValue called");
    // Manually load the service account and log the project ID

    const secretValue = await this.gcpSecretsManagerService.loadSecretVersion(
      "POSTGRES_HOST",
      "1",
    );

    if (!secretValue) {
      throw new Error("Secret not found");
    }

    return secretValue;
  }

  create(createExperimentalDto: CreateExperimentalDto) {
    return "This action adds a new experimental";
  }

  findAll() {
    return `This action returns all experimental`;
  }

  findOne(id: number) {
    return `This action returns a #${id} experimental`;
  }

  update(id: number, updateExperimentalDto: UpdateExperimentalDto) {
    return `This action updates a #${id} experimental`;
  }

  remove(id: number) {
    return `This action removes a #${id} experimental`;
  }
}
