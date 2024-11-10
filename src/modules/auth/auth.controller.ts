import { Controller, Post, Body, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserService } from "../user/user.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  async login(@Body() loginDto: { email: string; password: string }) {
    console.log("loginDto", loginDto);
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }
    return this.authService.login(user);
  }
}
