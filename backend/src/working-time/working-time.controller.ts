import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query} from '@nestjs/common';
import {WorkingTime} from "../model/workingtime.entity";
import {WorkingTimeService} from "./working-time.service";
import {WorkingTimeDTO, WorkingTimeRequestQuery} from "./working-time.requests";

@Controller('workingtimes')
export class WorkingTimeController {
  constructor(private workingTimeService: WorkingTimeService) {
  }

  @Get(':userID')
  public async getAllFromTimeRange(
    @Param('userID', ParseIntPipe) userID: number,
    @Query() query: WorkingTimeRequestQuery,
  ): Promise<WorkingTime[]> {
    if (query.end && query.start) {
      return await this.workingTimeService.getUserWorkingTimesFromTimeRange(userID, query);
    } else {
      return await this.workingTimeService.getUserWorkingTimes(userID);
    }
  }

  @Get(':userID/:id')
  public async getOne(
    @Param('userID', ParseIntPipe) userID: number,
    @Param('id', ParseIntPipe) id: number
  ): Promise<WorkingTime> {
    return this.workingTimeService.getUserWorkingTime(userID, id);
  }

  @Post(':userID')
  public async create(
    @Param('userID', ParseIntPipe) userID: number,
    @Body() workingTime: WorkingTimeDTO
  ): Promise<WorkingTime> {
    return this.workingTimeService.create(userID, workingTime);
  }

  @Put(':id')
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() workingTime: WorkingTimeDTO
  ): Promise<WorkingTime> {
    return this.workingTimeService.update(id, workingTime);
  }

  @Delete(':id')
  public async delete(@Param('id', ParseIntPipe) id: number): Promise<WorkingTime> {
    return this.workingTimeService.deleteById(id);
  }
}