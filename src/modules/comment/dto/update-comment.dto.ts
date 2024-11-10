import {
  IsNotEmpty,
  IsString,
  IsArray,
  ArrayNotEmpty,
  IsMongoId,
  IsOptional,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";

export interface IUpdateComment {
  content: string[];
  user: Types.ObjectId;
}

export class UpdateCommentDto {
  @ApiProperty({
    description: "The user's ID",
    example: "60d0fe4f5311236168a109ca",
  })
  @IsNotEmpty()
  @IsMongoId()
  user: Types.ObjectId; // The user's ID as a MongoDB ObjectId

  @ApiProperty({
    description:
      "The content of the comment, with each paragraph as a separate string in an array",
    example: ["First paragraph.", "Second paragraph.", "Third paragraph."],
  })
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  content: string[];
}
