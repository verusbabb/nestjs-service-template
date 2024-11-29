import {
  Injectable,
  Logger,
  NotFoundException,
  InternalServerErrorException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { Post as PostSchema } from "./schemas/post.schema";

@Injectable()
export class PostService {
  private readonly logger = new Logger(PostService.name);

  constructor(
    @InjectModel(PostSchema.name) private postModel: Model<PostSchema>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    try {
      this.logger.log("Creating post", { createPostDto });
      const newPost = new this.postModel(createPostDto);
      return await newPost.save();
    } catch (error) {
      this.logger.error("Failed to create post", { error, createPostDto });
      throw new InternalServerErrorException(
        `Failed to create post: ${error.message}`,
      );
    }
  }

  async findAll() {
    try {
      const posts = await this.postModel.find().populate("comments").exec();
      this.logger.log(`Found ${posts.length} posts`);
      return posts;
    } catch (error) {
      this.logger.error("Failed to fetch posts", { error });
      throw new InternalServerErrorException(
        `Failed to fetch posts: ${error.message}`,
      );
    }
  }

  async findOne(id: Types.ObjectId) {
    try {
      const post = await this.postModel
        .findById(id)
        .populate("comments")
        .exec();
      if (!post) {
        throw new NotFoundException(`Post with ID "${id}" not found`);
      }
      return post;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`Failed to fetch post ${id}`, { error });
      throw new InternalServerErrorException(
        `Failed to fetch post: ${error.message}`,
      );
    }
  }

  async update(id: Types.ObjectId, updatePostDto: UpdatePostDto) {
    try {
      const updatedPost = await this.postModel
        .findByIdAndUpdate(id, updatePostDto, { new: true })
        .populate("comments")
        .exec();

      if (!updatedPost) {
        throw new NotFoundException(`Post with ID "${id}" not found`);
      }

      this.logger.log(`Updated post ${id}`, { updatePostDto });
      return updatedPost;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`Failed to update post ${id}`, {
        error,
        updatePostDto,
      });
      throw new InternalServerErrorException(
        `Failed to update post: ${error.message}`,
      );
    }
  }

  async remove(id: Types.ObjectId) {
    try {
      const deletedPost = await this.postModel
        .findByIdAndDelete(id)
        .populate("comments")
        .exec();

      if (!deletedPost) {
        throw new NotFoundException(`Post with ID "${id}" not found`);
      }

      this.logger.log(`Removed post ${id}`);
      return deletedPost;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`Failed to remove post ${id}`, { error });
      throw new InternalServerErrorException(
        `Failed to remove post: ${error.message}`,
      );
    }
  }
}
