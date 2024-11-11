import { Controller, Post, Body, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { Logger } from "@nestjs/common";

@Controller("auth")
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Post("login")
  async login(@Body() credentials: LoginDto) {
    this.logger.log("Login attempt", { credentials });
    try {
      const user = await this.authService.validateUser(
        credentials.email,
        credentials.password,
      );
      if (!user) {
        throw new UnauthorizedException("Invalid credentials");
      }
      return this.authService.login(user);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException("An error occurred during login");
    }
  }
}
