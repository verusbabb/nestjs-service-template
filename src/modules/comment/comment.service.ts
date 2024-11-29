import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Comment } from "./schemas/comment.schema";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
  ) {}
  private readonly logger = new Logger(CommentService.name);
  async createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    try {
      this.logger.log("Creating comment", { createCommentDto });
      const newComment = new this.commentModel(createCommentDto);
      return await newComment.save();
    } catch (error) {
      this.logger.error("Error creating comment", { error, createCommentDto });
      if (error instanceof Error) {
        throw new InternalServerErrorException(
          `Failed to create comment: ${error.message}`,
        );
      }
      throw error;
    }
  }

  async findAllComments(): Promise<Comment[]> {
    try {
      this.logger.log("Finding all comments");
      return await this.commentModel.find().exec();
    } catch (error) {
      this.logger.error("Error finding all comments", { error });
      if (error instanceof Error) {
        throw new InternalServerErrorException(
          `Failed to retrieve comments: ${error.message}`,
        );
      }
      throw error;
    }
  }

  async findCommentById(commentId: Types.ObjectId): Promise<Comment | null> {
    try {
      this.logger.log("Finding comment by ID", { commentId });
      const comment = await this.commentModel.findById(commentId).exec();
      if (!comment) {
        throw new NotFoundException(`Comment with ID ${commentId} not found`);
      }
      return comment;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      if (error instanceof Error) {
        this.logger.error(`Error finding comment: ${error.message}`, {
          commentId,
        });
        throw new InternalServerErrorException("Failed to retrieve comment");
      }
      throw error;
    }
  }

  async findCommentWithUser(commentId: Types.ObjectId): Promise<Comment> {
    try {
      this.logger.log("Finding comment with user", { commentId });
      const comment = await this.commentModel
        .findById(commentId)
        .populate("user")
        .exec();
      if (!comment) {
        throw new NotFoundException(`Comment with ID ${commentId} not found`);
      }
      return comment;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      this.logger.error("Error finding comment with user", {
        error,
        commentId,
      });
      if (error instanceof Error) {
        throw new InternalServerErrorException(
          `Failed to retrieve comment with user: ${error.message}`,
        );
      }
      throw error;
    }
  }

  async findAllCommentsByUserId(userId: Types.ObjectId): Promise<Comment[]> {
    try {
      this.logger.log("Finding all comments by user ID", { userId });
      return await this.commentModel.find({ user: userId }).exec();
    } catch (error) {
      this.logger.error("Error finding comments by user ID", { error, userId });
      if (error instanceof Error) {
        throw new InternalServerErrorException(
          `Failed to retrieve user comments: ${error.message}`,
        );
      }
      throw error;
    }
  }

  async deleteComment(commentId: Types.ObjectId): Promise<Comment> {
    try {
      this.logger.log("Deleting comment", { commentId });
      const deletedComment = await this.commentModel
        .findByIdAndDelete(commentId)
        .exec();
      if (!deletedComment) {
        throw new NotFoundException(`Comment with ID ${commentId} not found`);
      }
      return deletedComment;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      this.logger.error("Error deleting comment", { error, commentId });
      if (error instanceof Error) {
        throw new InternalServerErrorException(
          `Failed to delete comment: ${error.message}`,
        );
      }
      throw error;
    }
  }

  async updateComment(
    commentId: Types.ObjectId,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment | null> {
    try {
      this.logger.log("Updating comment", { commentId, updateCommentDto });
      if (!Types.ObjectId.isValid(updateCommentDto.user)) {
        throw new BadRequestException("Invalid user ID format");
      }

      const updateData = {
        ...updateCommentDto,
        user: new Types.ObjectId(updateCommentDto.user),
      };

      const updatedComment = await this.commentModel
        .findByIdAndUpdate(commentId, updateData, { new: true })
        .exec();

      if (!updatedComment) {
        throw new NotFoundException(`Comment with ID ${commentId} not found`);
      }

      return updatedComment;
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      this.logger.error("Error updating comment", {
        error,
        commentId,
        updateCommentDto,
      });
      throw new InternalServerErrorException("Failed to update comment");
    }
  }
}
