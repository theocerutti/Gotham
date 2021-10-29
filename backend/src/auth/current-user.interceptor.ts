import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private userService: UserService, private jwtService: JwtService) {
  }

  async intercept(context: ExecutionContext, handler: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization.split(" ")[1]; // split to remove "Bearer"
    const decodedToken = this.jwtService.decode(token);
    const userId = decodedToken.sub;
    if (userId) {
      request.currentUser = await this.userService.getById(userId);
    }
    return handler.handle();
  }
}