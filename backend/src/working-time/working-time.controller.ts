import {UserDashboardFormater} from "./../util/userDashboardFormater";
import {Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Post, Put, Query} from "@nestjs/common";
import {WorkingTime} from "../model/workingtime.entity";
import {WorkingTimeService} from "./working-time.service";
import {WorkingTimeDTO, WorkingTimeRequestQuery} from "./working-time.dto";
import {CurrentUser} from "../auth/current-user.decorator";
import {User} from "../model/user.entity";
import {ApiOperation, ApiTags} from "@nestjs/swagger";

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
      if (query.formatType === "hoursInWeek") {
        const workingTimes = await this.workingTimeService.getUserWorkingTimesFromTimeRange(user.id, query);
        this.logger.log("GetHoursInWeek from timerange of me, timerange=", query);
        return UserDashboardFormater.getHoursInWeek(workingTimes);
      }
      return await this.workingTimeService.getUserWorkingTimesFromTimeRange(user.id, query);
    } else if (query.formatType === "hoursInWeek") {
      const workingTimes = await this.workingTimeService.getUserWorkingTimes(user.id);
      this.logger.log("GetHoursInWeek of me");
      return UserDashboardFormater.getHoursInWeek(workingTimes);
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
  // @Roles(Role.Manager, Role.GeneralManager) //TODO: why it is commented?
  @Get("/user/:userId")
  public async getAllFromUser(
    @Param("userId", ParseIntPipe) userId: number,
    @Query() query: WorkingTimeRequestQuery
  ) {
    if (query.end && query.start) {
      const workingTimes = await this.workingTimeService.getUserWorkingTimesFromTimeRange(userId, query);
      if (query.formatType === "hoursInWeek") {
        return UserDashboardFormater.getHoursInWeek(workingTimes);
      }
      this.logger.log("GetHoursInWeek from timerange of userId=", userId, " timerange=", query);
      return await this.workingTimeService.getUserWorkingTimesFromTimeRange(userId, query);

    } else if (query.formatType === "hoursInWeek") {
      const workingTimes = await this.workingTimeService.getUserWorkingTimes(userId);
      this.logger.log("GetHoursInWeek of userId=", userId);
      return UserDashboardFormater.getHoursInWeek(workingTimes);
    } else {
      this.logger.log("GetAllWorkingTimes of userId=", userId);
      return await this.workingTimeService.getUserWorkingTimes(userId);
    }
  }
}