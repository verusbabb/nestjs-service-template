import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ExperimentalService } from "./experimental.service";
import { CreateExperimentalDto } from "./dto/create-experimental.dto";
import { UpdateExperimentalDto } from "./dto/update-experimental.dto";

@Controller("experimental")
export class ExperimentalController {
  constructor(private readonly experimentalService: ExperimentalService) {}

  @Get("/secret")
  //use logger to print a log of this controller endpoint running
  async getSecretValue() {
    return this.experimentalService.getSecretValue();
  }

  @Post()
  create(@Body() createExperimentalDto: CreateExperimentalDto) {
    return this.experimentalService.create(createExperimentalDto);
  }

  @Get()
  findAll() {
    return this.experimentalService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.experimentalService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateExperimentalDto: UpdateExperimentalDto,
  ) {
    return this.experimentalService.update(+id, updateExperimentalDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.experimentalService.remove(+id);
  }
}
