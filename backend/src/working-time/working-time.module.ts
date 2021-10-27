import { ClockModule } from './../clock/clock.module';
import {Module} from '@nestjs/common';
import { WorkingTimeController } from './working-time.controller';
import { WorkingTimeService } from './working-time.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {WorkingTime} from "../model/workingtime.entity";
import {UserModule} from "../user/user.module";

@Module({
  imports : [TypeOrmModule.forFeature([WorkingTime]), UserModule, ClockModule],
  controllers: [WorkingTimeController],
  providers: [WorkingTimeService],
  exports: [WorkingTimeService]
})
export class WorkingTimeModule {}
