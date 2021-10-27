import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query} from '@nestjs/common';
import {WorkingTime} from "../model/workingtime.entity";
import {WorkingTimeService} from "./working-time.service";
import {WorkingTimeDTO, WorkingTimeRequestQuery} from "./working-time.requests";
import {UserService} from "../user/user.service";
import {User} from "../model/user.entity";
import {DeleteResult} from "typeorm";

@Controller('workingtimes')
export class WorkingTimeController {

  constructor(private workingTimeService: WorkingTimeService, private userService: UserService) {}

  @Get(':userID')
  public async getAllFromTimeRange(
      @Param('userID') userID: number,
      @Query() query: WorkingTimeRequestQuery,
  ): Promise<WorkingTime[]> {
    const user: User = await this.userService.getUserById(userID);
    // Filter by TimeRange
    const workingTimes = await this.workingTimeService.getWorkingTimesFromUser(user);
    if (query.end && query.start) {
      return workingTimes.filter(workingtime => {
        return workingtime.start >= new Date(query.start) && workingtime.end <= new Date(query.end);
      });
    }
    // Or send all workingtimes
    return workingTimes;
  }

  @Get(':userID/:id')
  public async getOne(@Param('userID') userID: number, @Param('id') id: string): Promise<WorkingTime> {
    const user: User = await this.userService.getUserById(userID);
    const workingTimes = await this.workingTimeService.getWorkingTimesFromUser(user);
    const workingTime = workingTimes.find(workingtime => {
      return workingtime.id === parseInt(id)
    });
    if (!workingTime)
      throw new HttpException(`WorkingTime#${id} doesn't exists!`, HttpStatus.NOT_FOUND);
    return workingTime;
  }

  @Post(':userID')
  public async create(@Param('userID') userID: number, @Body() workingTime: WorkingTimeDTO): Promise<WorkingTime> {
    const user: User = await this.userService.getUserById(userID);
    return this.workingTimeService.create(user, workingTime);
  }

  @Put(':id')
  public async update(@Param('id') id: number, @Body() workingTime: WorkingTimeDTO): Promise<WorkingTime> {
    return this.workingTimeService.update(id, workingTime);
  }

  @Delete(':id')
  public async delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.workingTimeService.deleteById(id);
  }
}