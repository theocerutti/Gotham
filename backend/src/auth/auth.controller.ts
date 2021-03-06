import {Body, Controller, Logger, Post, Res} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {CreateUserDTO, LoginUserDTO} from "./auth.dto";
import {SkipAuth} from "./skip-auth.decorators";
import {User} from "../model/user.entity";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {RefreshRequest} from "./refresh_token.dto";
import {EXPIRATION_REFRESH_TOKEN, RefreshTokenService} from "./refresh_token.service";

export interface AuthenticationPayload {
  user: User;
  payload: {
    access_token: string
    refresh_token?: string
  };
}

const TOKEN_AUTH_RES_HEADER = "Authorization";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService, private refreshTokenService: RefreshTokenService) {
  }

  @ApiOperation({summary: "Login a user"})
  @SkipAuth()
  @Post("login")
  async login(
    @Body() body: LoginUserDTO,
    @Res({passthrough: true}) res
  ): Promise<AuthenticationPayload> {
    this.logger.log("Login user: ", body);
    const info = await this.authService.login(
      body.username,
      body.password
    );
    res.setHeader(TOKEN_AUTH_RES_HEADER, info.token);
    const refreshToken = await this.refreshTokenService.generateRefreshToken(info.user, EXPIRATION_REFRESH_TOKEN); // TODO: generateRefreshToken from refreshToken in DB?
    return AuthController.buildResponsePayload(info.user, info.token, refreshToken);
  }

  @ApiOperation({summary: "Register a user"})
  @SkipAuth()
  @Post("register")
  async register(
    @Body() body: CreateUserDTO,
    @Res({passthrough: true}) res
  ): Promise<AuthenticationPayload> {
    this.logger.log("Register user: ", body);
    const user = await this.authService.register(body);
    const info = await this.authService.login(
      user.username,
      body.password
    );
    res.setHeader(TOKEN_AUTH_RES_HEADER, info.token);
    const refresh_token = await this.refreshTokenService.generateRefreshToken(user, EXPIRATION_REFRESH_TOKEN);
    return AuthController.buildResponsePayload(user, info.token, refresh_token);
  }

  @ApiOperation({summary: "Refresh access token"})
  @SkipAuth()
  @Post("refresh")
  public async refresh(@Body() body: RefreshRequest): Promise<string> {
    return await this.refreshTokenService.createAccessTokenFromRefreshToken(body.refresh_token);
  }

  private static buildResponsePayload(user: User, accessToken: string, refreshToken?: string): AuthenticationPayload {
    return {
      user: user,
      payload: {
        access_token: accessToken,
        ...(refreshToken ? {refresh_token: refreshToken} : {}),
      }
    };
  }
}
