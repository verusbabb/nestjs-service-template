import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { User } from "./schemas/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  private readonly logger = new Logger(UserService.name);

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      this.logger.log("Creating user", { createUserDto });
      const newUser = new this.userModel(createUserDto);
      return newUser.save();
    } catch (error) {
      this.logger.error("Error creating user", { error, createUserDto });
      throw error;
    }
  }

  async findUserById(userId: Types.ObjectId) {
    try {
      this.logger.log("Finding user by ID", { userId });
      return this.userModel.findById(userId).exec();
    } catch (error) {
      this.logger.error("Error finding user by ID", { error, userId });
      throw error;
    }
  }

  async findUserWithComments(userId: Types.ObjectId) {
    try {
      this.logger.log("Finding user with comments", { userId });
      return this.userModel.findById(userId).populate("comments").exec();
    } catch (error) {
      this.logger.error("Error finding user with comments", { error, userId });
      throw error;
    }
  }

  async deleteUser(userId: Types.ObjectId): Promise<User | null> {
    try {
      this.logger.log("Deleting user", { userId });
      return this.userModel.findByIdAndDelete(userId).exec();
    } catch (error) {
      this.logger.error("Error deleting user", { error, userId });
      throw error;
    }
  }

  async updateUser(
    userId: Types.ObjectId,
    updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    try {
      this.logger.log("Updating user", { userId, updateUserDto });
      if (!Types.ObjectId.isValid(userId)) {
        throw new Error("Invalid user ID format");
      }

      return this.userModel
        .findByIdAndUpdate(new Types.ObjectId(userId), updateUserDto, {
          new: true,
        })
        .exec();
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
