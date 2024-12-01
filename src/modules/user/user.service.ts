import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { User } from "./schemas/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  private readonly logger = new Logger(UserService.name);

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      if (!createUserDto.email) {
        throw new BadRequestException("Email is required");
      }

      this.logger.log("Creating user", createUserDto);
      const existingUser = await this.userModel
        .findOne({ email: createUserDto.email })
        .exec();

      if (existingUser) {
        throw new BadRequestException("User with this email already exists");
      }

      const newUser = new this.userModel(createUserDto);
      return await newUser.save();
    } catch (error) {
      this.logger.error("Error creating user", {
        error: error.message,
        createUserDto,
      });

      if (error instanceof BadRequestException) {
        throw error;
      }

      if (error.name === "MongoServerError" && error.code === 11000) {
        throw new BadRequestException("Duplicate key error");
      }

      if (error.name === "ValidationError") {
        throw new BadRequestException(error.message);
      }

      throw new InternalServerErrorException("Failed to create user");
    }
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    try {
      if (!createUserDto.password || !createUserDto.email) {
        throw new BadRequestException("Email and password are required");
      }

      this.logger.log("Registering new user", createUserDto);
      const existingUser = await this.userModel
        .findOne({ email: createUserDto.email })
        .exec();

      if (existingUser) {
        throw new BadRequestException("User with this email already exists");
      }

      const { password, ...userData } = createUserDto;
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new this.userModel({
        ...userData,
        password: hashedPassword,
      });

      return await newUser.save();
    } catch (error) {
      this.logger.error("Error registering user", {
        error: error.message,
        createUserDto,
      });

      if (error instanceof BadRequestException) {
        throw error;
      }

      if (error.name === "MongoServerError" && error.code === 11000) {
        throw new BadRequestException("Duplicate key error");
      }

      if (error.name === "ValidationError") {
        throw new BadRequestException(error.message);
      }

      throw new InternalServerErrorException("Failed to register user");
    }
  }

  async findUserById(userId: Types.ObjectId) {
    try {
      if (!userId || !Types.ObjectId.isValid(userId)) {
        throw new BadRequestException("Invalid user ID format");
      }

      this.logger.log("Finding user by ID", { userId });
      const user = await this.userModel.findById(userId).exec();

      if (!user) {
        throw new NotFoundException("User not found");
      }

      return user;
    } catch (error) {
      this.logger.error("Error finding user by ID", {
        error: error.message,
        userId,
      });

      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }

      if (error.name === "CastError") {
        throw new BadRequestException("Invalid user ID format");
      }

      throw new InternalServerErrorException("Failed to find user");
    }
  }

  async findByUsername(email: string) {
    try {
      if (!email) {
        throw new BadRequestException("Email is required");
      }
      this.logger.log("Finding user by username", { email });

      const user = await this.userModel.findOne({ email }).exec();
      if (!user) {
        throw new NotFoundException("User not found");
      }

      return user;
    } catch (error) {
      this.logger.error("Error finding user by username", {
        error: error.message,
        email,
      });
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      throw new InternalServerErrorException("Failed to find user");
    }
  }

  async findUserWithComments(userId: Types.ObjectId) {
    try {
      if (!Types.ObjectId.isValid(userId)) {
        throw new BadRequestException("Invalid user ID format");
      }
      this.logger.log("Finding user with comments", { userId });
      const user = await this.userModel
        .findById(userId)
        .populate("comments")
        .exec();

      if (!user) {
        throw new NotFoundException("User not found");
      }

      return user;
    } catch (error) {
      this.logger.error("Error finding user with comments", {
        error: error.message,
        userId,
      });

      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }

      throw new InternalServerErrorException(
        "Failed to find user with comments",
      );
    }
  }

  async deleteUser(userId: Types.ObjectId): Promise<User | null> {
    try {
      if (!Types.ObjectId.isValid(userId)) {
        throw new BadRequestException("Invalid user ID format");
      }
      this.logger.log("Deleting user", { userId });
      const deletedUser = await this.userModel.findByIdAndDelete(userId).exec();
      if (!deletedUser) {
        throw new NotFoundException("User not found");
      }
      return deletedUser;
    } catch (error) {
      this.logger.error("Error deleting user", {
        error: error.message,
        userId,
      });
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      throw new InternalServerErrorException("Failed to delete user");
    }
  }

  async updateUser(
    userId: Types.ObjectId,
    updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    try {
      if (!Types.ObjectId.isValid(userId)) {
        throw new BadRequestException("Invalid user ID format");
      }
      this.logger.log("Updating user", { userId, updateUserDto });

      const updatedUser = await this.userModel
        .findByIdAndUpdate(userId, updateUserDto, { new: true })
        .exec();

      if (!updatedUser) {
        throw new NotFoundException("User not found");
      }

      return updatedUser;
    } catch (error) {
      this.logger.error("Error updating user", {
        error: error.message,
        userId,
        updateUserDto,
      });
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      throw new InternalServerErrorException("Failed to update user");
    }
  }
}
