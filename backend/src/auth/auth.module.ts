import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {LocalStrategy} from './local.strategy';
import {JwtStrategy} from './jwt.strategy';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {jwtConstants} from './constants';
import {UserModule} from "../user/user.module";
import {AuthController} from "./auth.controller";

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '1h'},
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {
}