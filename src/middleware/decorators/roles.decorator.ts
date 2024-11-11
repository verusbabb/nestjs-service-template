import { SetMetadata } from "@nestjs/common";
import { UserRole } from "../../shared/types/user.type";

export const ROLES_KEY = "roles";
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
