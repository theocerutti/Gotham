import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {ClockService} from "./clock.service";
import {User} from "../model/user.entity";
import {UserService} from "../user/user.service";
import {Clock} from "../model/clock.entity";
import {ClockDTO} from "./clock-requests";
import {WorkingTimeDTO} from "../working-time/working-time.requests";
import {WorkingTimeService} from "../working-time/working-time.service";

@Controller('clock')
export class ClockController {
  constructor(private clockService: ClockService, private userService: UserService, private workingTimeService: WorkingTimeService) {}

  @Get(':userID')
  async getOne(@Param('userID') userID: number): Promise<Clock> {
    const user: User = await this.userService.getUserById(userID);
    return user.clock;
  }

  @Post(':userID')
  async switchClock(@Param('userID') userID: number, @Body() clockDTO: ClockDTO): Promise<Clock> {
    const user: User = await this.userService.getUserById(userID);
    let clock: Clock = user.clock;
    if (!clock) {
      clock = await this.clockService.create(user, clockDTO);
    }
    if (clock.status) {
      clock.time = clockDTO.time;
      clock.status = false;
    } else {
      clock.status = true;
      let workingTimeDTO = new WorkingTimeDTO();
      workingTimeDTO.start = clock.time;
      workingTimeDTO.end = clockDTO.time;
      await this.workingTimeService.create(user, workingTimeDTO);
    }
    return await this.clockService.update(clock);
  }
}
