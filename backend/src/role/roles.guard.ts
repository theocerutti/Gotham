import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {getRoleLevel, Role, RoleLevel} from "./role.utils";
import {ROLE_KEY} from "./roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {
  }

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.getAllAndOverride<Role>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRole || !RoleLevel[requiredRole]) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const {user} = request;
    return getRoleLevel(requiredRole) <= getRoleLevel(user.role);
  }
}