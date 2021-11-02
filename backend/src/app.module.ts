import {Module} from "@nestjs/common";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserModule} from "./user/user.module";
import {WorkingTimeModule} from "./working-time/working-time.module";
import {ClockModule} from "./clock/clock.module";
import {TeamModule} from "./team/team.module";
import {APP_GUARD, APP_INTERCEPTOR} from "@nestjs/core";
import {RolesGuard} from "./role/roles.guard";
import {AuthModule} from "./auth/auth.module";
import {JwtAuthGuard} from "./auth/jwt-auth.guard";
import {CurrentUserInterceptor} from "./auth/current-user.interceptor";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.POSTGRES_HOST || "localhost",
      port: parseInt(process.env.POSTGRES_PORT) || 5433,
      username: process.env.POSTGRES_USER || "postgres",
      password: process.env.POSTGRES_PASSWORD || "postgres",
      database: process.env.POSTGRES_DATABASE || "postgres",
      synchronize: true,
      autoLoadEntities: true
    }),
    UserModule,
    WorkingTimeModule,
    ClockModule,
    TeamModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { // first guard
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    { // second guard
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor,
    },
  ],
})

export class AppModule {
}
