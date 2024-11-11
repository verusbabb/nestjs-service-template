import { Injectable, UnauthorizedException } from "@nestjs/common";
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
      this.logger.log("Validating user credentials", { email });
      const user = await this.userService.findByUsername(email);
      if (user && (await bcrypt.compare(password, user.password))) {
        const userObject = user.toObject() as unknown as IUser;
        delete userObject.password;
        return userObject;
      }
      return null;
    } catch (error) {
      throw new UnauthorizedException(
        `Error validating user credentials: ${error.message}`,
      );
    }
  }

  async login(user: IUser) {
    try {
      const payload = {
        username: user.email,
        sub: user._id,
        role: user.role,
      };

      // Generate access token (short-lived) and refresh token (long-lived)
      const accessToken = this.jwtService.sign(payload);
      const refreshToken = this.jwtService.sign(payload, { expiresIn: "7d" });

      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw new UnauthorizedException(
        `Error during login process: ${error.message}`,
      );
    }
  }

  async refreshToken(token: string) {
    try {
      // Verify the refresh token
      const payload = this.jwtService.verify(token, {
        ignoreExpiration: false,
      });

      // Generate a new access token
      const newAccessToken = this.jwtService.sign({
        username: payload.username,
        sub: payload.sub,
        role: payload.role,
      });

      return { accessToken: newAccessToken };
    } catch (error) {
      throw new UnauthorizedException(
        `Invalid refresh token: ${error.message}`,
      );
    }
  }
}
