import { UserDashboardFormater } from './../util/userDashboardFormater';
import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query} from "@nestjs/common";
import {WorkingTime} from "../model/workingtime.entity";
import {WorkingTimeService} from "./working-time.service";
import {WorkingTimeDTO, WorkingTimeRequestQuery} from "./working-time.dto";
import {CurrentUser} from "../auth/current-user.decorator";
import {User} from "../model/user.entity";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {Roles} from "../role/roles.decorator";
import {Role} from "../role/role.utils";

@Controller("workingtimes")
@ApiTags("workingtimes")
export class WorkingTimeController {
  constructor(private workingTimeService: WorkingTimeService) {
  }

  @ApiOperation({summary: "Get all my working times"})
  @Get()
  public async getMeAll(
    @CurrentUser() user: User,
    @Query() query: WorkingTimeRequestQuery
  ): Promise<WorkingTime[]> {
    if (query.end && query.start) {
      return await this.workingTimeService.getUserWorkingTimesFromTimeRange(user.id, query);
    }else if (query.hoursInWeek === "true"){
      const workingTimes = await this.workingTimeService.getUserWorkingTimes(user.id);
      return UserDashboardFormater.getHoursInWeek(workingTimes)
    } 
    else {
      return await this.workingTimeService.getUserWorkingTimes(user.id);
    }
  }

  @ApiOperation({summary: "Get a working time by id"})
  @Get(":workingTimeId")
  public async getMeOne(
    @CurrentUser() user: User,
    @Param("workingTimeId", ParseIntPipe) workingTimeId: number
  ): Promise<WorkingTime> {
    return await this.workingTimeService.getUserWorkingTime(user.id, workingTimeId);
  }

  @ApiOperation({summary: "Update a working time"})
  @Put(":workingTimeId")
  public async updateMeOne(
    @CurrentUser() user: User,
    @Param("workingTimeId", ParseIntPipe) workingTimeId: number,
    @Body() workingTimeDTO: WorkingTimeDTO
  ): Promise<WorkingTime> {
    return await this.workingTimeService.updateByUserId(user.id, workingTimeId, workingTimeDTO);
  }

  @ApiOperation({summary: "Create a working time"})
  @Post()
  public async createMeOne(
    @CurrentUser() user: User,
    @Body() workingTime: WorkingTimeDTO
  ): Promise<WorkingTime> {
    return this.workingTimeService.create(user.id, workingTime);
  }

  @ApiOperation({summary: "Delete all working times"})
  @Delete()
  public async deleteMeAll(@CurrentUser() user: User): Promise<WorkingTime[]> {
    return await this.workingTimeService.deleteAllByUserId(user.id);
  }

  @ApiOperation({summary: "Delete a working time"})
  @Delete(":workingTimeId")
  public async deleteMeOne(
    @CurrentUser() user: User,
    @Param("workingTimeId", ParseIntPipe) workingTimeId: number,
  ): Promise<WorkingTime> {
    return await this.workingTimeService.deleteByUserId(user.id, workingTimeId);
  }

  @ApiOperation({summary: "Get all working times from a user (manager, generalManager)"})
  @Roles(Role.Manager, Role.GeneralManager)
  @Get("/user/:userId")
  public async getAllFromUser(@Param("userId", ParseIntPipe) userId: number) {
    return await this.workingTimeService.getUserWorkingTimes(userId);
  }
}