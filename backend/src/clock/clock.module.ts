import { WorkingTimeModule } from './../working-time/working-time.module';
import { forwardRef, Module} from '@nestjs/common';
import { ClockController } from './clock.controller';
import { ClockService } from './clock.service';
import {UserModule} from "../user/user.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Clock} from "../model/clock.entity";

@Module({
  imports : [TypeOrmModule.forFeature([Clock]), UserModule, forwardRef(() => WorkingTimeModule)],
  controllers: [ClockController],
  providers: [ClockService],
  exports: [ClockService]
})
export class ClockModule {}
