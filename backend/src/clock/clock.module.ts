import {forwardRef, Module} from '@nestjs/common';
import { ClockController } from './clock.controller';
import { ClockService } from './clock.service';
import {UserModule} from "../user/user.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Clock} from "../model/clock.entity";
import {WorkingTimeModule} from "../working-time/working-time.module";

@Module({
  imports : [TypeOrmModule.forFeature([Clock]), UserModule, WorkingTimeModule],
  controllers: [ClockController],
  providers: [ClockService]
})
export class ClockModule {}
