import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  InternalServerErrorException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import * as bcrypt from "bcrypt";
import { IUser } from "../user/interfaces/user.interface";
import { Logger } from "@nestjs/common";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<IUser | null> {
    try {
      if (!email || !password) {
        throw new BadRequestException("Email and password are required");
      }

      this.logger.log("Validating user credentials", { email });
      const user = await this.userService.findByUsername(email);

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException("Invalid credentials");
      }

      const userObject = user.toObject() as unknown as IUser;
      delete userObject.password;
      return userObject;
    } catch (error) {
      this.logger.error("Error validating user", { error, email });

      if (
        error instanceof BadRequestException ||
        error instanceof UnauthorizedException
      ) {
        throw error;
      }

      throw new InternalServerErrorException("Authentication service error");
    }
  }

  async login(user: IUser) {
    try {
      if (!user || !user.email || !user._id) {
        throw new BadRequestException("Invalid user data");
      }

      const payload = {
        username: user.email,
        sub: user._id,
        role: user.role,
      };

      const accessToken = this.jwtService.sign(payload);
      const refreshToken = this.jwtService.sign(payload, { expiresIn: "7d" });

      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      this.logger.error("Error during login", { error, userId: user?._id });

      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException("Login service error");
    }
  }

  async refreshToken(token: string) {
    try {
      if (!token) {
        throw new BadRequestException("Refresh token is required");
      }

      // Verify the refresh token
      const payload = this.jwtService.verify(token, {
        ignoreExpiration: false,
      });

      if (!payload.username || !payload.sub) {
        throw new UnauthorizedException("Invalid token payload");
      }

      // Generate a new access token
      const newAccessToken = this.jwtService.sign({
        username: payload.username,
        sub: payload.sub,
        role: payload.role,
      });

      return { accessToken: newAccessToken };
    } catch (error) {
      this.logger.error("Error refreshing token", { error });

      if (
        error instanceof BadRequestException ||
        error instanceof UnauthorizedException ||
        error.name === "JsonWebTokenError" ||
        error.name === "TokenExpiredError"
      ) {
        throw new UnauthorizedException("Invalid or expired refresh token");
      }

      throw new InternalServerErrorException("Token refresh service error");
    }
  }
}
