import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../decorators/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  private readonly logger = new Logger(RolesGuard.name);

  canActivate(context: ExecutionContext): boolean {
    try {
      this.logger.log("Checking user role");

      // Retrieve the roles allowed for this route
      const requiredRoles = this.reflector.get<string[]>(
        ROLES_KEY,
        context.getHandler(),
      );
      if (!requiredRoles) {
        return true; // No roles required, allow access
      }

      // Retrieve the user from the request
      const request = context.switchToHttp().getRequest();
      const user = request.user;

      // Check if the user's role is included in the requiredRoles
      return user && requiredRoles.includes(user.role);
    } catch (error) {
      this.logger.error("Error in RolesGuard:", error);
      return false; // Deny access on error
    }
  }
}
