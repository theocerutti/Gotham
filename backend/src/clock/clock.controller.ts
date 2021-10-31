import {Body, Controller, Get, Post} from '@nestjs/common';
import {ClockService} from "./clock.service";
import {Clock} from "../model/clock.entity";
import {ClockDTO} from "./clock.dto";
import {CurrentUser} from "../auth/current-user.decorator";
import {User} from "../model/user.entity";
import {WorkingTime} from "../model/workingtime.entity";
import {ApiTags} from "@nestjs/swagger";

@Controller('clocks')
@ApiTags('clocks')
export class ClockController {
  constructor(private clockService: ClockService) {
  }

  @Get()
  async getUserClock(@CurrentUser() user: User): Promise<Clock> {
    return await this.clockService.getUserClockById(user.id);
  }

  @Post()
  async switchUserClock(
    @CurrentUser() user: User,
    @Body() clockDTO: ClockDTO
  ): Promise<WorkingTime[]> {
    return await this.clockService.switchClock(user.id, clockDTO);
  }
}
