import { IsOptional, IsString, IsMongoId, IsArray } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";

export interface IUpdatePost {
  title?: string;
  content?: string[];
  author?: Types.ObjectId;
}

export class UpdatePostDto {
  @ApiProperty({
    description: "The title of the post",
    example: "My Updated Post Title",
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    description: "The content of the post",
    example: "This is the updated content of the post.",
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  content: string[];

  @ApiProperty({
    description: "The ID of the author",
    example: "60d0fe4f5311236168a109ca",
    required: false,
  })
  @IsOptional()
  @IsMongoId()
  author?: string;
}
