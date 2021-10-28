import {Body, Controller, Get, Param, ParseIntPipe, Post} from '@nestjs/common';
import {ClockService} from "./clock.service";
import {Clock} from "../model/clock.entity";
import {ClockDTO} from "./clock-requests";

@Controller('clocks')
export class ClockController {
  constructor(private clockService: ClockService) {
  }

  @Get(':userID')
  async getOne(@Param('userID', ParseIntPipe) userID: number): Promise<Clock> {
    return await this.clockService.getClockFromUserId(userID);
  }

  @Post(':userID')
  async switchClock(
    @Param('userID', ParseIntPipe) userID: number,
    @Body() clockDTO: ClockDTO
  ): Promise<Clock> {
    return await this.clockService.switchClock(userID, clockDTO);
  }
}
