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
    if (query.end && query.start) {
      return user.workingtimes.filter(workingtime => {
        return workingtime.start >= query.start && workingtime.end <= query.end;
      });
    }
    // Or send all workingtimes
    return user.workingtimes;
  }

  @Get(':userID/:id')
  public async getOne(@Param('userID') userID: number, @Param('id') id: number): Promise<WorkingTime> {
    const user: User = await this.userService.getUserById(userID);
    const workingTime = user.workingtimes.find(workingtime => workingtime.id === id);
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
    return this.workingTimeService.update(workingTime);
  }

  @Delete(':id')
  public async delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.workingTimeService.deleteById(id);
  }
}