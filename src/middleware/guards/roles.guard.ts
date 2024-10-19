// src/modules/auth/roles.guard.ts

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserRole } from '../../shared/types';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();
    console.log('requiredRoles :>> ', requiredRoles);
    console.log('user :>> ', request.user);
    if (!requiredRoles) {
      return true; // If no roles are specified, allow access
    }

    if (!request.user) {
      return false; // No user found, deny access
    }
    return requiredRoles.includes(request.user.role);
  }
}
