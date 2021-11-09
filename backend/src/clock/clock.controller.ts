import {Body, Controller, Get, Logger, Post} from "@nestjs/common";
import {ClockService} from "./clock.service";
import {Clock} from "../model/clock.entity";
import {ClockDTO} from "./clock.dto";
import {CurrentUser} from "../auth/current-user.decorator";
import {User} from "../model/user.entity";
import {WorkingTime} from "../model/workingtime.entity";
import {ApiOperation, ApiTags} from "@nestjs/swagger";

@Controller("clocks")
@ApiTags("clocks")
export class ClockController {
  private readonly logger = new Logger(ClockController.name);

  constructor(private clockService: ClockService) {
  }

  @ApiOperation({summary: "Get user clock"})
  @Get()
  async getUserClock(@CurrentUser() user: User): Promise<Clock> {
    this.logger.log("Get user clock with userId=", user.id);
    return await this.clockService.getUserClockById(user.id);
  }

  @ApiOperation({summary: "Switch user clock to register working times"})
  @Post()
  async switchUserClock(
    @CurrentUser() user: User,
    @Body() clockDTO: ClockDTO
  ): Promise<WorkingTime[]> {
    this.logger.log("Get user clock with userId=", user.id, "clock:", clockDTO);
    return await this.clockService.switchClock(user.id, clockDTO);
  }
}
