import {ClockModule} from "../clock/clock.module";
import {forwardRef, Module} from "@nestjs/common";
import {WorkingTimeController} from "./working-time.controller";
import {WorkingTimeService} from "./working-time.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {WorkingTime} from "../model/workingtime.entity";
import {UserModule} from "../user/user.module";
import {WorkingTimeRepository} from "./working-time.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([WorkingTime, WorkingTimeRepository]),
    forwardRef(() => UserModule),
    forwardRef(() => ClockModule)
  ],
  controllers: [WorkingTimeController],
  providers: [WorkingTimeService],
  exports: [WorkingTimeService]
})
export class WorkingTimeModule {
}
