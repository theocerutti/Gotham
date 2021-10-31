import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query} from '@nestjs/common';
import {WorkingTime} from "../model/workingtime.entity";
import {WorkingTimeService} from "./working-time.service";
import {WorkingTimeDTO, WorkingTimeRequestQuery} from "./working-time.dto";
import {CurrentUser} from "../auth/current-user.decorator";
import {User} from "../model/user.entity";
import {ApiTags} from "@nestjs/swagger";

@Controller('workingtimes')
@ApiTags('workingtimes')
export class WorkingTimeController {
  constructor(private workingTimeService: WorkingTimeService) {
  }

  @Get()
  public async getMeAll(
    @CurrentUser() user: User,
    @Query() query: WorkingTimeRequestQuery
  ): Promise<WorkingTime[]> {
    if (query.end && query.start) {
      return await this.workingTimeService.getUserWorkingTimesFromTimeRange(user.id, query);
    } else {
      return await this.workingTimeService.getUserWorkingTimes(user.id);
    }
  }

  @Get(':workingTimeId')
  public async getMeOne(
    @CurrentUser() user: User,
    @Param('workingTimeId', ParseIntPipe) workingTimeId: number
  ): Promise<WorkingTime> {
    return await this.workingTimeService.getUserWorkingTime(user.id, workingTimeId);
  }

  @Put(':workingTimeId')
  public async updateMeOne(
    @CurrentUser() user: User,
    @Param('workingTimeId', ParseIntPipe) workingTimeId: number,
    @Body() workingTimeDTO: WorkingTimeDTO
  ): Promise<WorkingTime> {
    return await this.workingTimeService.updateByUserId(user.id, workingTimeId, workingTimeDTO)
  }

  @Post()
  public async createMeOne(
    @CurrentUser() user: User,
    @Body() workingTime: WorkingTimeDTO
  ): Promise<WorkingTime> {
    return this.workingTimeService.create(user.id, workingTime);
  }

  @Delete()
  public async deleteMeAll(@CurrentUser() user: User): Promise<WorkingTime[]> {
    return await this.workingTimeService.deleteAllByUserId(user.id);
  }

  @Delete(':workingTimeId')
  public async deleteMeOne(
    @CurrentUser() user: User,
    @Param('workingTimeId', ParseIntPipe) workingTimeId: number,
  ): Promise<WorkingTime> {
    return await this.workingTimeService.deleteByUserId(user.id, workingTimeId);
  }
}