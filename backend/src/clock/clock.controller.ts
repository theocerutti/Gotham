import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {ClockService} from "./clock.service";
import {User} from "../model/user.entity";
import {UserService} from "../user/user.service";
import {Clock} from "../model/clock.entity";
import {ClockDTO} from "./clock-requests";
import {WorkingTimeDTO} from "../working-time/working-time.requests";
import {WorkingTimeService} from "../working-time/working-time.service";

@Controller('clocks')
export class ClockController {
  constructor(private clockService: ClockService, private userService: UserService) {}

  @Get(':userID')
  async getOne(@Param('userID') userID: number): Promise<Clock> {
    const user: User = await this.userService.getUserById(userID);
    return await this.clockService.getClockFromUser(user);
  }

  @Post(':userID')
  async switchClock(@Param('userID') userID: number, @Body() clockDTO: ClockDTO): Promise<Clock> {
    const user: User = await this.userService.getUserById(userID);
    let clock: Clock = user.clock;
    if (!clock) {
      clock = await this.clockService.getClockFromUser(user);
    }
    if (clock.status) {
      clock.time = clockDTO.time;
      clock.status = false;
    } else {
      clock.status = true;
      let workingTimeDTO = new WorkingTimeDTO();
      workingTimeDTO.start = clock.time;
      workingTimeDTO.end = clockDTO.time;
      await this.clockService.createWorkingTime(user, workingTimeDTO);
    }
    return await this.clockService.update(clock);
  }
}
