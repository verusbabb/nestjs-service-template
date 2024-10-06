import { Controller, Get, Logger } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AppService } from "./app.service";

@ApiTags("App")
@Controller("api/app")
export class AppController {
  constructor(private readonly appService: AppService) {}

  private readonly logger = new Logger(AppController.name);

  @ApiOperation({ summary: "Ping Service" })
  @ApiResponse({ status: 200, description: "OK" })
  @ApiResponse({ status: 500, description: "Internal Server Error" })
  @Get("/ping")
  async ping(): Promise<string> {
    this.logger.debug(`[ping]`);

    return "Ok";
  }

  @ApiOperation({ summary: "Get Application Health" })
  @ApiResponse({ status: 200, description: "OK" })
  @ApiResponse({ status: 500, description: "Internal Server Error" })
  @Get("/health")
  async healthCheck(): Promise<{ status: string }> {
    this.logger.debug(`[healthCheck]`);

    return this.appService.healthCheck();
  }
}
