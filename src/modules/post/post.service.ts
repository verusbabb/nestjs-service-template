import { Injectable, Logger } from "@nestjs/common";
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
      throw new Error(`Failed to create post: ${error.message}`);
    }
  }

  async findAll() {
    try {
      return this.postModel.find().populate("comments").exec();
    } catch (error) {
      throw new Error(`Failed to fetch posts: ${error.message}`);
    }
  }

  async findOne(id: Types.ObjectId) {
    try {
      return this.postModel.findById(id).populate("comments").exec();
    } catch (error) {
      throw new Error(`Failed to fetch post ${id}: ${error.message}`);
    }
  }

  async update(id: Types.ObjectId, updatePostDto: UpdatePostDto) {
    try {
      return this.postModel
        .findByIdAndUpdate(id, updatePostDto, { new: true })
        .populate("comments")
        .exec();
    } catch (error) {
      throw new Error(`Failed to update post ${id}: ${error.message}`);
    }
  }

  async remove(id: Types.ObjectId) {
    try {
      return this.postModel.findByIdAndDelete(id).populate("comments").exec();
    } catch (error) {
      throw new Error(`Failed to remove post ${id}: ${error.message}`);
    }
  }
}
