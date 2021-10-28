import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {Role} from "./role.enum";
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
    console.log(requiredRole);
    if (!requiredRole) {
      return true;
    }
    const {user} = context.switchToHttp().getRequest();
    return requiredRole === user.role;
  }
}