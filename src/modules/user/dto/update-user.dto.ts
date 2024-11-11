import { IsEmail, IsOptional, IsString, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class UpdateUserDto {
  @ApiProperty({
    description: "The first name of the user",
    example: "John",
  })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({
    description: "The middle name of the user",
    example: "Doe",
  })
  @IsOptional()
  @IsString()
  middleName?: string;

  @ApiProperty({
    description: "The last name of the user",
    example: "Doe",
  })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({
    description: "The password of the user",
    example: "password",
  })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({
    description: "The role of the user",
    example: "admin",
  })
  @IsOptional()
  @IsString()
  role?: string;

  @ApiProperty({
    description: "The email of the user",
    example: "john.doe@example.com",
  })
  @IsOptional()
  @IsEmail()
  email?: string;
}
