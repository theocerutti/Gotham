import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Module({
  imports: [
      TypeOrmModule.forRoot({
        type: 'postgres',
        port: 5432,
        username: 'postgres',
        password: 'postregs',
        database: 'postgres',
        entities: ['./model/user.entity.ts'],
        synchronize: true,
      }),
      UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
