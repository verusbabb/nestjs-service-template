import { Injectable, Logger } from "@nestjs/common";
import { CreateExperimentalDto } from "./dto/create-experimental.dto";
import { UpdateExperimentalDto } from "./dto/update-experimental.dto";
import { CustomConfigService } from "../config/config.service";

@Injectable()
export class ExperimentalService {
  private readonly logger = new Logger(ExperimentalService.name);

  constructor(private readonly configService: CustomConfigService) {
    this.logger.log(`CustomConfigService injected: ${!!this.configService}`);
    this.logger.log(
      `CustomConfigService methods: ${Object.keys(this.configService)}`,
    );
  }

  async getSecretValue(): Promise<string> {
    this.logger.log("getSecretValue called");
    const secretValue = await this.configService.get("POSTGRES_HOST");

    this.logger.log({ secretValue });

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
