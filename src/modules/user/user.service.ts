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
    this.logger.log("Creating user", { createUserDto });
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async findUserById(userId: string) {
    this.logger.log("Finding user by ID", { userId });
    return this.userModel.findById(userId).exec();
  }

  async findUserWithComments(userId: string) {
    this.logger.log("Finding user with comments", { userId });
    return this.userModel.findById(userId).populate("comments").exec();
  }

  async deleteUser(userId: string): Promise<User | null> {
    this.logger.log("Deleting user", { userId });
    return this.userModel.findByIdAndDelete(userId).exec();
  }

  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    this.logger.log("Updating user", { userId, updateUserDto });
    // Validate that userId is a valid ObjectId
    if (!Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid user ID format");
    }

    // Perform the update operation
    return this.userModel
      .findByIdAndUpdate(new Types.ObjectId(userId), updateUserDto, {
        new: true,
      })
      .exec();
  }
}
