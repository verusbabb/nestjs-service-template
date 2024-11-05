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
import { CommentService } from "./comment.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller("comments")
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  private readonly logger = new Logger(CommentController.name);

  @ApiOperation({ summary: "Create a comment" })
  @ApiResponse({ status: 200, description: "Comment created successfully" })
  @Post()
  async createComment(@Body() createCommentDto: CreateCommentDto) {
    this.logger.log("Creating comment", { createCommentDto });
    return this.commentService.createComment(createCommentDto);
  }
  @ApiOperation({ summary: "Find all comments" })
  @ApiResponse({ status: 200, description: "Comments found successfully" })
  @Get()
  async findAllComments() {
    this.logger.log("Finding all comments");
    return this.commentService.findAllComments();
  }

  @ApiOperation({ summary: "Find a comment by ID" })
  @ApiResponse({ status: 200, description: "Comment found successfully" })
  @ApiResponse({ status: 404, description: "Comment not found" })
  @Get(":id")
  async findCommentById(@Param("id") commentId: string) {
    this.logger.log("Finding comment by ID", { commentId });
    return this.commentService.findCommentById(commentId);
  }

  @ApiOperation({ summary: "Find a comment with user" })
  @ApiResponse({ status: 200, description: "Comment found successfully" })
  @ApiResponse({ status: 404, description: "Comment not found" })
  @Get(":id/user")
  async findCommentWithUser(@Param("id") commentId: string) {
    this.logger.log("Finding comment with user", { commentId });
    return this.commentService.findCommentWithUser(commentId);
  }

  @ApiOperation({ summary: "Find all comments by user ID" })
  @ApiResponse({ status: 200, description: "Comments found successfully" })
  @ApiResponse({ status: 404, description: "User not found" })
  @Get(":id/user/comments")
  async findAllCommentsByUserId(@Param("id") userId: string) {
    this.logger.log("Finding all comments by user ID", { userId });
    return this.commentService.findAllCommentsByUserId(userId);
  }

  // delete comment
  @ApiOperation({ summary: "Delete a comment" })
  @ApiResponse({ status: 200, description: "Comment deleted successfully" })
  @ApiResponse({ status: 404, description: "Comment not found" })
  @Delete(":id")
  async deleteComment(@Param("id") commentId: string) {
    this.logger.log("Deleting comment", { commentId });
    return this.commentService.deleteComment(commentId);
  }

  // update comment
  @ApiOperation({ summary: "Update a comment" })
  @ApiResponse({ status: 200, description: "Comment updated successfully" })
  @ApiResponse({ status: 404, description: "Comment not found" })
  @Put(":id")
  async updateComment(
    @Param("id") commentId: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    this.logger.log("Updating comment", { commentId, updateCommentDto });
    return this.commentService.updateComment(commentId, updateCommentDto);
  }
}
