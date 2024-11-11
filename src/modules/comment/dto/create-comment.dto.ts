import {
  IsNotEmpty,
  IsString,
  IsArray,
  ArrayNotEmpty,
  IsMongoId,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";

export interface ICreateComment {
  content: string[];
  user: Types.ObjectId;
  post: Types.ObjectId;
}

export class CreateCommentDto {
  @ApiProperty({
    description: "The user's ID",
    example: "60d0fe4f5311236168a109ca",
  })
  @IsNotEmpty()
  @IsMongoId()
  user: Types.ObjectId; // The user's ID as a MongoDB ObjectId

  @ApiProperty({
    description: "The post's ID",
    example: "60d0fe4f5311236168a109ca",
  })
  @IsNotEmpty()
  @IsMongoId()
  post: Types.ObjectId; // The post's ID as a MongoDB ObjectId

  @ApiProperty({
    description:
      "The content of the comment, with each paragraph as a separate string in an array",
    example: ["First paragraph.", "Second paragraph.", "Third paragraph."],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  content: string[];
}
