import {
  IsNotEmpty,
  IsString,
  IsArray,
  ArrayNotEmpty,
  IsMongoId,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";

export interface ICreatePost {
  title: string;
  content: string[]; // Array of strings, each representing a paragraph
  author: Types.ObjectId; // The ID of the author (MongoDB ObjectId in string format)
}

export class CreatePostDto {
  @ApiProperty({
    description: "The title of the post",
    example: "My Blog Post",
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description:
      "The content of the post, with each paragraph as a separate string in an array",
    example: ["First paragraph.", "Second paragraph.", "Third paragraph."],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  content: string[];

  @ApiProperty({
    description: "The ID of the author",
    example: "60d0fe4f5311236168a109ca",
  })
  @IsNotEmpty()
  @IsMongoId()
  author: string;
}
