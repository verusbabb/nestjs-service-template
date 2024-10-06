import { Injectable } from "@nestjs/common";
import { CreateExperimentalDto } from "./dto/create-experimental.dto";
import { UpdateExperimentalDto } from "./dto/update-experimental.dto";
import { CustomConfigService } from "../modules/config/config.service";

@Injectable()
export class ExperimentalService {
  constructor(private readonly configService: CustomConfigService) {} // Inject ConfigService

  async getSecretValue(): Promise<string> {
    // Use the ConfigService to fetch the secret from GCP Secret Manager or environment variables
    const secretValue = await this.configService.get("POSTGRES_HOST");

    console.log("POSTGRES_HOST", this.configService.get("POSTGRES_HOST"));

    // Check if the secret was successfully retrieved
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
