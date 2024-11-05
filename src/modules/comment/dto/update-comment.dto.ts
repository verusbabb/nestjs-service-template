import { IsNotEmpty, IsString, IsMongoId } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateCommentDto {
  @ApiProperty({
    description: "The content of the comment",
    example: "This is a comment",
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    description: "The user's ID",
    example: "60d0fe4f5311236168a109ca",
  })
  @IsMongoId() // Ensures user is a valid MongoDB ObjectId in string format
  @IsNotEmpty()
  user: string;
}
