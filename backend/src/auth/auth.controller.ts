import {Body, Controller, Post, Res} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {CreateUserDTO, LoginUserDTO} from "./auth.dto";
import {SkipAuth} from "./skip-auth.decorators";
import {User} from "../model/user.entity";
import {ApiOperation, ApiTags} from "@nestjs/swagger";

const TOKEN_AUTH_RES_HEADER = "token";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @ApiOperation({summary: "Login a user"})
  @SkipAuth()
  @Post("login")
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

  @ApiOperation({summary: "Register a user"})
  @SkipAuth()
  @Post("register")
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
