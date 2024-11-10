/* eslint-disable @typescript-eslint/no-explicit-any */
// auth.service.ts
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    try {
      const user = await this.userService.findByUsername(email);
      if (user && (await bcrypt.compare(password, user.password))) {
        const userObject = user.toObject() as { [key: string]: any };
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

  async login(user: any) {
    try {
      const payload = {
        username: user.username,
        sub: user._id,
        role: user.role,
      };
      return {
        accessToken: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw new UnauthorizedException(
        `Error during login process: ${error.message}`,
      );
    }
  }
}
