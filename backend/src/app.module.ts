import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserModule} from './user/user.module';
import {WorkingTimeModule} from './working-time/working-time.module';
import {ClockModule} from './clock/clock.module';
import {TeamModule} from './team/team.module';
import {APP_GUARD} from "@nestjs/core";
import {RolesGuard} from "./role/roles.guard";
import {AuthModule} from './auth/auth.module';
import {JwtAuthGuard} from "./auth/jwt-auth.guard";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
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
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})

export class AppModule {
}
