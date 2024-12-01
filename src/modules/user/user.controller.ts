import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
  Logger,
  UseGuards,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Types } from "mongoose";
import { User } from "./schemas/user.schema";
import { RolesGuard } from "../../middleware/guards/roles.guard";
import { JwtAuthGuard } from "../../middleware/guards/jwt-auth.guard";
import { UserRole } from "../../shared/types/user.type";
import { Roles } from "../../middleware/decorators/roles.decorator";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}
  private readonly logger = new Logger(UserController.name);

  @ApiOperation({ summary: "Create a user" })
  @ApiResponse({ status: 200, description: "User created successfully" })
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      this.logger.log("Creating user", createUserDto);
      return await this.userService.createUser(createUserDto);
    } catch (error) {
      this.logger.error("Error creating user", {
        error: error.message,
        createUserDto,
      });
      throw error;
    }
  }

  @ApiOperation({ summary: "Register a new user" })
  @ApiResponse({ status: 201, description: "User registered successfully" })
  @ApiResponse({ status: 400, description: "Username already taken" })
  @Post("register")
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      this.logger.log("Registering new user", createUserDto);
      const newUser = await this.userService.createUser(createUserDto);
      this.logger.log("User registered successfully", { userId: newUser._id });
      return newUser;
    } catch (error) {
      this.logger.error("Error registering user", {
        error: error.message,
        createUserDto,
      });
      throw error;
    }
  }

  @ApiOperation({ summary: "Find a user by ID" })
  @ApiResponse({ status: 200, description: "User found successfully" })
  @Get(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.USER)
  async findUserById(@Param("id") userId: Types.ObjectId) {
    try {
      this.logger.log("Finding user by ID", { userId });
      return await this.userService.findUserById(userId);
    } catch (error) {
      this.logger.error("Error finding user by ID", {
        error: error.message,
        userId,
      });
      throw error;
    }
  }

  @ApiOperation({ summary: "Find a user with comments" })
  @ApiResponse({ status: 200, description: "User found successfully" })
  @Get(":id/comments")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.USER)
  async findUserWithComments(@Param("id") userId: Types.ObjectId) {
    try {
      this.logger.log("Finding user with comments", { userId });
      return await this.userService.findUserWithComments(userId);
    } catch (error) {
      this.logger.error("Error finding user with comments", {
        error: error.message,
        userId,
      });
      throw error;
    }
  }

  @ApiOperation({ summary: "Delete a user" })
  @ApiResponse({ status: 200, description: "User deleted successfully" })
  @Delete(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async deleteUser(@Param("id") userId: Types.ObjectId) {
    try {
      this.logger.log("Deleting user", { userId });
      return await this.userService.deleteUser(userId);
    } catch (error) {
      this.logger.error("Error deleting user", {
        error: error.message,
        userId,
      });
      throw error;
    }
  }

  // update user
  @ApiOperation({ summary: "Update a user" })
  @ApiResponse({ status: 200, description: "User updated successfully" })
  @Put(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async updateUser(
    @Param("id") userId: Types.ObjectId,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      this.logger.log("Updating user", { userId, updateUserDto });
      return await this.userService.updateUser(userId, updateUserDto);
    } catch (error) {
      this.logger.error("Error updating user", {
        error: error.message,
        userId,
        updateUserDto,
      });
      throw error;
    }
  }
}
