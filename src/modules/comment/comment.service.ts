import { Injectable, Logger } from "@nestjs/common";
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
    this.logger.log("Creating comment", { createCommentDto });
    const newComment = new this.commentModel(createCommentDto);
    return newComment.save();
  }

  async findAllComments(): Promise<Comment[]> {
    this.logger.log("Finding all comments");
    return this.commentModel.find().exec();
  }

  async findCommentById(commentId: string): Promise<Comment | null> {
    this.logger.log("Finding comment by ID", { commentId });
    return this.commentModel.findById(commentId).exec();
  }

  async findCommentWithUser(commentId: string): Promise<Comment | null> {
    this.logger.log("Finding comment with user", { commentId });
    return this.commentModel.findById(commentId).populate("user").exec();
  }

  async findAllCommentsByUserId(userId: string): Promise<Comment[]> {
    this.logger.log("Finding all comments by user ID", { userId });
    return this.commentModel.find({ user: userId }).exec();
  }

  async deleteComment(commentId: string): Promise<Comment | null> {
    this.logger.log("Deleting comment", { commentId });
    return this.commentModel.findByIdAndDelete(commentId).exec();
  }

  async updateComment(
    commentId: string,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment | null> {
    this.logger.log("Updating comment", { commentId, updateCommentDto });
    const updateData = {
      ...updateCommentDto,
      user: new Types.ObjectId(updateCommentDto.user), // Cast user to Types.ObjectId
    };

    return this.commentModel
      .findByIdAndUpdate(commentId, updateData, { new: true })
      .exec();
  }
}
