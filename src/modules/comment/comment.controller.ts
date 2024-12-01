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
import { CommentService } from "./comment.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Types } from "mongoose";
import { JwtAuthGuard } from "../../middleware/guards/jwt-auth.guard";
import { UserRole } from "../../shared/types/user.type";
import { Roles } from "../../middleware/decorators/roles.decorator";
import { RolesGuard } from "../../middleware/guards/roles.guard";

@Controller("comments")
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  private readonly logger = new Logger(CommentController.name);

  @ApiOperation({ summary: "Create a comment" })
  @ApiResponse({ status: 200, description: "Comment created successfully" })
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.USER)
  async createComment(@Body() createCommentDto: CreateCommentDto) {
    try {
      this.logger.log("Creating comment", createCommentDto);
      return await this.commentService.createComment(createCommentDto);
    } catch (error) {
      this.logger.error("Error creating comment", {
        error: error.message,
        createCommentDto,
      });
      throw error;
    }
  }

  @ApiOperation({ summary: "Find all comments" })
  @ApiResponse({ status: 200, description: "Comments found successfully" })
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.USER)
  async findAllComments() {
    try {
      this.logger.log("Finding all comments");
      return await this.commentService.findAllComments();
    } catch (error) {
      this.logger.error("Error finding all comments", { error: error.message });
      throw error;
    }
  }

  @ApiOperation({ summary: "Find a comment by ID" })
  @ApiResponse({ status: 200, description: "Comment found successfully" })
  @ApiResponse({ status: 404, description: "Comment not found" })
  @Get(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.USER)
  async findCommentById(@Param("id") commentId: Types.ObjectId) {
    this.logger.log("Finding comment by ID", { commentId });
    return this.commentService.findCommentById(commentId);
  }

  @ApiOperation({ summary: "Find a comment with user" })
  @ApiResponse({ status: 200, description: "Comment found successfully" })
  @ApiResponse({ status: 404, description: "Comment not found" })
  @Get(":id/user")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.USER)
  async findCommentWithUser(@Param("id") commentId: Types.ObjectId) {
    this.logger.log("Finding comment with user", { commentId });
    return this.commentService.findCommentWithUser(commentId);
  }

  @ApiOperation({ summary: "Find all comments by user ID" })
  @ApiResponse({ status: 200, description: "Comments found successfully" })
  @ApiResponse({ status: 404, description: "User not found" })
  @Get(":id/user/comments")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.USER)
  async findAllCommentsByUserId(@Param("id") userId: Types.ObjectId) {
    this.logger.log("Finding all comments by user ID", { userId });
    return this.commentService.findAllCommentsByUserId(userId);
  }

  @ApiOperation({ summary: "Delete a comment" })
  @ApiResponse({ status: 200, description: "Comment deleted successfully" })
  @ApiResponse({ status: 404, description: "Comment not found" })
  @Delete(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async deleteComment(@Param("id") commentId: Types.ObjectId) {
    try {
      this.logger.log("Deleting comment", { commentId });
      return await this.commentService.deleteComment(commentId);
    } catch (error) {
      this.logger.error("Error deleting comment", {
        error: error.message,
        commentId,
      });
      throw error;
    }
  }

  @ApiOperation({ summary: "Update a comment" })
  @ApiResponse({ status: 200, description: "Comment updated successfully" })
  @ApiResponse({ status: 404, description: "Comment not found" })
  @Put(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.USER)
  async updateComment(
    @Param("id") commentId: Types.ObjectId,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    this.logger.log("Updating comment", { commentId, updateCommentDto });
    return this.commentService.updateComment(commentId, updateCommentDto);
  }
}
