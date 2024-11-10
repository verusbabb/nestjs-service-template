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
import { Types } from "mongoose";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}
  private readonly logger = new Logger(UserController.name);

  @ApiOperation({ summary: "Create a user" })
  @ApiResponse({ status: 200, description: "User created successfully" })
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      this.logger.log("Creating user", { createUserDto });
      return await this.userService.createUser(createUserDto);
    } catch (error) {
      this.logger.error("Error creating user", { error, createUserDto });
      throw error;
    }
  }

  @ApiOperation({ summary: "Find a user by ID" })
  @ApiResponse({ status: 200, description: "User found successfully" })
  @Get(":id")
  async findUserById(@Param("id") userId: Types.ObjectId) {
    try {
      this.logger.log("Finding user by ID", { userId });
      return await this.userService.findUserById(userId);
    } catch (error) {
      this.logger.error("Error finding user by ID", { error, userId });
      throw error;
    }
  }

  @ApiOperation({ summary: "Find a user with comments" })
  @ApiResponse({ status: 200, description: "User found successfully" })
  @Get(":id/comments")
  async findUserWithComments(@Param("id") userId: Types.ObjectId) {
    try {
      this.logger.log("Finding user with comments", { userId });
      return await this.userService.findUserWithComments(userId);
    } catch (error) {
      this.logger.error("Error finding user with comments", { error, userId });
      throw error;
    }
  }

  @ApiOperation({ summary: "Delete a user" })
  @ApiResponse({ status: 200, description: "User deleted successfully" })
  @Delete(":id")
  async deleteUser(@Param("id") userId: Types.ObjectId) {
    try {
      this.logger.log("Deleting user", { userId });
      return await this.userService.deleteUser(userId);
    } catch (error) {
      this.logger.error("Error deleting user", { error, userId });
      throw error;
    }
  }

  // update user
  @ApiOperation({ summary: "Update a user" })
  @ApiResponse({ status: 200, description: "User updated successfully" })
  @Put(":id")
  async updateUser(
    @Param("id") userId: Types.ObjectId,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      this.logger.log("Updating user", { userId, updateUserDto });
      return await this.userService.updateUser(userId, updateUserDto);
    } catch (error) {
      this.logger.error("Error updating user", {
        error,
        userId,
        updateUserDto,
      });
      throw error;
    }
  }
}
