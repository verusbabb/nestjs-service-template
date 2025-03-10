import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Logger,
  UseGuards,
} from "@nestjs/common";
import { PostService } from "./post.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Types } from "mongoose";
import { RolesGuard } from "../../middleware/guards/roles.guard";
import { JwtAuthGuard } from "../../middleware/guards/jwt-auth.guard";
import { UserRole } from "../../shared/types/user.type";
import { Roles } from "../../middleware/decorators/roles.decorator";

@Controller("post")
export class PostController {
  constructor(private readonly postService: PostService) {}
  private readonly logger = new Logger(PostController.name);

  @ApiOperation({ summary: "Create a new post" })
  @ApiResponse({ status: 201, description: "Post created successfully" })
  @ApiResponse({ status: 400, description: "Bad request" })
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async create(@Body() createPostDto: CreatePostDto) {
    try {
      this.logger.log("Creating post", createPostDto);
      return await this.postService.create(createPostDto);
    } catch (error) {
      this.logger.error("Error creating post", {
        error: error.message,
        createPostDto,
      });
      throw error;
    }
  }

  @ApiOperation({ summary: "Get all posts" })
  @ApiResponse({ status: 200, description: "Retrieved all posts successfully" })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.USER)
  @Get()
  async findAll() {
    try {
      this.logger.log("Finding all posts");
      return await this.postService.findAll();
    } catch (error) {
      this.logger.error("Error finding all posts", { error: error.message });
      throw error;
    }
  }

  @ApiOperation({ summary: "Get a post by ID" })
  @ApiResponse({ status: 200, description: "Post found successfully" })
  @ApiResponse({ status: 404, description: "Post not found" })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.USER)
  @Get(":id")
  async findOne(@Param("id") id: Types.ObjectId) {
    try {
      this.logger.log("Finding post by ID", { id });
      return await this.postService.findOne(id);
    } catch (error) {
      this.logger.error("Error finding post", { error: error.message, id });
      throw error;
    }
  }

  @ApiOperation({ summary: "Update a post" })
  @ApiResponse({ status: 200, description: "Post updated successfully" })
  @ApiResponse({ status: 404, description: "Post not found" })
  @ApiResponse({ status: 400, description: "Bad request" })
  @Put(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async update(
    @Param("id") id: Types.ObjectId,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    try {
      this.logger.log("Updating post", { id, updatePostDto });
      return await this.postService.update(id, updatePostDto);
    } catch (error) {
      this.logger.error("Error updating post", {
        error: error.message,
        id,
        updatePostDto,
      });
      throw error;
    }
  }

  @ApiOperation({ summary: "Delete a post" })
  @ApiResponse({ status: 200, description: "Post deleted successfully" })
  @ApiResponse({ status: 404, description: "Post not found" })
  @Delete(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async remove(@Param("id") id: Types.ObjectId) {
    try {
      this.logger.log("Deleting post", { id });
      return await this.postService.remove(id);
    } catch (error) {
      this.logger.error("Error deleting post", { error: error.message, id });
      throw error;
    }
  }
}
