import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserModule} from './user/user.module';
import {WorkingTimeModule} from './working-time/working-time.module';
import {ClockModule} from './clock/clock.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 5433,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      synchronize: true,
      autoLoadEntities: true
    }),
    UserModule,
    WorkingTimeModule,
    ClockModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
}
