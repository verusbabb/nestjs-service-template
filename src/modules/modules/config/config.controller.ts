import { Controller } from "@nestjs/common";
import { CustomConfigService } from "./config.service";

@Controller("config")
export class ConfigController {
  constructor(private readonly configService: CustomConfigService) {}
}
