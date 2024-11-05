import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
  Logger,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}
  private readonly logger = new Logger(UserController.name);

  @ApiOperation({ summary: "Create a user" })
  @ApiResponse({ status: 200, description: "User created successfully" })
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    this.logger.log("Creating user", { createUserDto });
    return this.userService.createUser(createUserDto);
  }

  @ApiOperation({ summary: "Find a user by ID" })
  @ApiResponse({ status: 200, description: "User found successfully" })
  @Get(":id")
  async findUserById(@Param("id") userId: string) {
    this.logger.log("Finding user by ID", { userId });
    return this.userService.findUserById(userId);
  }

  @ApiOperation({ summary: "Find a user with comments" })
  @ApiResponse({ status: 200, description: "User found successfully" })
  @Get(":id/comments")
  async findUserWithComments(@Param("id") userId: string) {
    this.logger.log("Finding user with comments", { userId });
    return this.userService.findUserWithComments(userId);
  }

  @ApiOperation({ summary: "Delete a user" })
  @ApiResponse({ status: 200, description: "User deleted successfully" })
  @Delete(":id")
  async deleteUser(@Param("id") userId: string) {
    this.logger.log("Deleting user", { userId });
    return this.userService.deleteUser(userId);
  }

  // update user
  @ApiOperation({ summary: "Update a user" })
  @ApiResponse({ status: 200, description: "User updated successfully" })
  @Put(":id")
  async updateUser(
    @Param("id") userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    this.logger.log("Updating user", { userId, updateUserDto });
    return this.userService.updateUser(userId, updateUserDto);
  }
}
