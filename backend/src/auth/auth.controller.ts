import {Body, Controller, Get, Post, Res} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {CreateUserDTO, LoginUserDTO} from "./auth.requests";
import {SkipAuth} from "./skip-auth.decorators";
import {User} from "../model/user.entity";
import {CurrentUser} from "./current-user.decorator";
import {Roles} from "../role/roles.decorator";
import {Role} from "../role/role.utils";
import {ApiTags} from "@nestjs/swagger";

const TOKEN_AUTH_RES_HEADER = "token"

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Get('ping')
  @Roles(Role.User)
  async ping(@CurrentUser() user: User) {
    return user;
  }

  @SkipAuth()
  @Post('login')
  async login(
    @Body() body: LoginUserDTO,
    @Res({passthrough: true}) res
  ): Promise<string> {
    const newTokenPromise = this.authService.login(
      body.username,
      body.password
    );
    const newToken = await newTokenPromise;
    res.setHeader(TOKEN_AUTH_RES_HEADER, newToken);
    return newTokenPromise;
  }

  @SkipAuth()
  @Post('register')
  async register(
    @Body() body: CreateUserDTO,
    @Res({passthrough: true}) res
  ): Promise<User> {
    const userPromise = await this.authService.register(body);
    const user = await userPromise;
    const newTokenPromise = this.authService.login(
      user.username,
      body.password
    );
    const newToken = await newTokenPromise;
    res.setHeader(TOKEN_AUTH_RES_HEADER, newToken);
    return user;
  }
}
