import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({
    description: "The first name of the user",
    example: "John",
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

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
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({
    description: "The password of the user",
    example: "password",
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    description: "The role of the user",
    example: "admin",
  })
  @IsNotEmpty()
  @IsString()
  role: string;

  @ApiProperty({
    description: "The email of the user",
    example: "john.doe@example.com",
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
