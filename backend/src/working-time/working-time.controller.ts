import { UserDashboardFormater } from './../util/userDashboardFormater';
import {Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Post, Put, Query, UnauthorizedException} from "@nestjs/common";
import {WorkingTime} from "../model/workingtime.entity";
import {WorkingTimeService} from "./working-time.service";
import {WorkingTimeDTO, WorkingTimeRequestQuery} from "./working-time.dto";
import {CurrentUser} from "../auth/current-user.decorator";
import {User} from "../model/user.entity";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import { Role } from '../role/role.utils';

@Controller("workingtimes")
@ApiTags("workingtimes")
export class WorkingTimeController {
  private readonly logger = new Logger(WorkingTimeController.name);

  constructor(private workingTimeService: WorkingTimeService) {
  }

  @ApiOperation({summary: "Get all my working times"})
  @Get()
  public async getMeAll(
    @CurrentUser() user: User,
    @Query() query: WorkingTimeRequestQuery
  ): Promise<WorkingTime[]> {
    if (query.end && query.start) {
      if (query.formatType === "hoursCurrentWeek") {
        const workingTimes = await this.workingTimeService.getUserWorkingTimesFromTimeRange(user.id, query);
        this.logger.log("GetHoursInWeek from timerange of me, timerange=", query);
        return UserDashboardFormater.getHoursCurrentWeek(workingTimes);
      }
      return await this.workingTimeService.getUserWorkingTimesFromTimeRange(user.id, query);
    } else if (query.formatType === "hoursCurrentWeek") {
      const workingTimes = await this.workingTimeService.getUserWorkingTimes(user.id);
      this.logger.log("GetHoursCurrentWeek of me");
      return UserDashboardFormater.getHoursCurrentWeek(workingTimes);
    } else {
      this.logger.log("Get all my workingTimes");
      return await this.workingTimeService.getUserWorkingTimes(user.id);
    }
  }

  @ApiOperation({summary: "Get a working time by id"})
  @Get(":workingTimeId")
  public async getMeOne(
    @CurrentUser() user: User,
    @Param("workingTimeId", ParseIntPipe) workingTimeId: number
  ): Promise<WorkingTime> {
    this.logger.log("Get one of my workingTime, workingTimeId=", workingTimeId);
    return await this.workingTimeService.getUserWorkingTime(user.id, workingTimeId);
  }

  @ApiOperation({summary: "Update a working time"})
  @Put(":workingTimeId")
  public async updateMeOne(
    @CurrentUser() user: User,
    @Param("workingTimeId", ParseIntPipe) workingTimeId: number,
    @Body() workingTimeDTO: WorkingTimeDTO
  ): Promise<WorkingTime> {
    this.logger.log("Update one of my workingTime, workingTimeId=", workingTimeId);
    return await this.workingTimeService.updateByUserId(user.id, workingTimeId, workingTimeDTO);
  }

  @ApiOperation({summary: "Create a working time"})
  @Post()
  public async createMeOne(
    @CurrentUser() user: User,
    @Body() workingTime: WorkingTimeDTO
  ): Promise<WorkingTime> {
    this.logger.log("Create workingTime for me");
    return this.workingTimeService.create(user.id, workingTime);
  }

  @ApiOperation({summary: "Delete all working times"})
  @Delete()
  public async deleteMeAll(@CurrentUser() user: User): Promise<WorkingTime[]> {
    this.logger.log("Delete me all my working times");
    return await this.workingTimeService.deleteAllByUserId(user.id);
  }

  @ApiOperation({summary: "Delete a working time"})
  @Delete(":workingTimeId")
  public async deleteMeOne(
    @CurrentUser() user: User,
    @Param("workingTimeId", ParseIntPipe) workingTimeId: number,
  ): Promise<WorkingTime> {
    this.logger.log("Delete me one of my workingTime, workingTimeId=", workingTimeId);
    return await this.workingTimeService.deleteByUserId(user.id, workingTimeId);
  }

  @ApiOperation({summary: "Get all working times from a user (manager, generalManager)"})
  @Get("/user/:userId")
  public async getAllFromUser(
    @CurrentUser() currentUser: User,
    @Param("userId", ParseIntPipe) userId: number,
    @Query() query: WorkingTimeRequestQuery,
    ) {
    if(currentUser.id === userId || currentUser.role === Role.Manager || currentUser.role === Role.GeneralManager){
      if (query.end && query.start) {
        const workingTimes = await this.workingTimeService.getUserWorkingTimesFromTimeRange(userId, query);
        if(query.formatType === "hoursCurrentWeek"){
          return UserDashboardFormater.getHoursCurrentWeek(workingTimes)
        }
        if(query.formatType === "hoursLastWeeks"){
          return UserDashboardFormater.getHoursLastWeek(workingTimes)
        }
        return await this.workingTimeService.getUserWorkingTimesFromTimeRange(userId, query);
      }
      else if(query.formatType === "generalMetrics"){
        const workingTimes = await this.workingTimeService.getUserWorkingTimes(userId);
        return UserDashboardFormater.getGeneralMetrics(workingTimes)
      }
      else {
        return await this.workingTimeService.getUserWorkingTimes(userId);
      }
    }
    if (currentUser.role === Role.User)
      throw new UnauthorizedException();
  }
}