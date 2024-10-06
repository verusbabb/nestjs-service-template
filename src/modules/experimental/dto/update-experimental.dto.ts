import { PartialType } from '@nestjs/swagger';
import { CreateExperimentalDto } from './create-experimental.dto';

export class UpdateExperimentalDto extends PartialType(CreateExperimentalDto) {}
