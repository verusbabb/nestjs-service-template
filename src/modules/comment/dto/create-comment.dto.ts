import { IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";
export class CreateCommentDto {
  @ApiProperty({
    description: "The user's ID",
    example: "60d0fe4f5311236168a109ca",
  })
  @IsNotEmpty()
  user: Types.ObjectId; // This should be the user's ID

  @ApiProperty({
    description: "The content of the comment",
    example: "This is a comment",
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}
