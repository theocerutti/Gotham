import {forwardRef, HttpException, HttpStatus, Inject, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {WorkingTime} from "../model/workingtime.entity";
import {WorkingTimeDTO, WorkingTimeRequestQuery} from "./working-time.dto";
import {WorkingTimeRepository} from "./working-time.repository";
import {UserService} from "../user/user.service";

@Injectable()
export class WorkingTimeService {
  constructor(
    @InjectRepository(WorkingTimeRepository) private readonly WorkingTimeRepo: WorkingTimeRepository,
    @Inject(forwardRef(() => UserService)) private userService: UserService
  ) {
  }

  async getUserWorkingTimes(userID: number): Promise<WorkingTime[]> {
    try {
      return await this.WorkingTimeRepo.getUserWorkingTimes(userID);
    } catch (error) {
      throw new HttpException(`Can't get all user working times: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getUserWorkingTime(userID: number, workingTimeID: number): Promise<WorkingTime> {
    try {
      return await this.WorkingTimeRepo.findOneOrFail(workingTimeID, {
        where: {user: {id: userID}}
      });
    } catch (error) {
      throw new HttpException(`Can't get user working time: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getUserWorkingTimesFromTimeRange(userID: number, query: WorkingTimeRequestQuery): Promise<WorkingTime[]> {
    try {
      const workingTimes = await this.getUserWorkingTimes(userID);
      return workingTimes.filter(workingtime => {
        return workingtime.start >= new Date(query.start) && workingtime.end <= new Date(query.end);
      });
    } catch (error) {
      throw new HttpException(`Can't get user working time from timerange: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateByUserId(userID: number, workingTimeId: number, workingTimeDTO: WorkingTimeDTO): Promise<WorkingTime> {
    const user = await this.userService.getById(userID);
    const userWorkingTimes = await this.WorkingTimeRepo.getUserWorkingTimes(userID);
    const workingTime = userWorkingTimes.find(workingTime => workingTime.id === workingTimeId);
    if (!workingTime)
      throw new HttpException("No working time found!", HttpStatus.NOT_FOUND);
    workingTime.start = workingTimeDTO.start;
    workingTime.end = workingTimeDTO.end;
    workingTime.description = workingTimeDTO.description;
    workingTime.billable = workingTimeDTO.billable;
    workingTime.user = user;
    try {
      return await this.WorkingTimeRepo.save(workingTime);
    } catch (error) {
      throw new HttpException(`Can't update workingTime: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteAllByUserId(userID: number): Promise<WorkingTime[]> {
    try {
      const userWorkingTimes = await this.getUserWorkingTimes(userID);
      return await this.WorkingTimeRepo.remove(userWorkingTimes);
    } catch (error) {
      throw new HttpException(`Can't delete all workingtimes: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteByUserId(userID: number, workingTimeId: number): Promise<WorkingTime> {
    try {
      const workingTime = await this.getUserWorkingTime(userID, workingTimeId);
      return await this.WorkingTimeRepo.remove(workingTime);
    } catch (error) {
      throw new HttpException(`Can't delete workingtime: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(userID: number, workingTimeDTO: WorkingTimeDTO): Promise<WorkingTime> {
    const user = await this.userService.getById(userID);
    const newWorkingTime = new WorkingTime();
    newWorkingTime.start = workingTimeDTO.start;
    newWorkingTime.end = workingTimeDTO.end;
    newWorkingTime.description = workingTimeDTO.description;
    newWorkingTime.billable = workingTimeDTO.billable;
    newWorkingTime.user = user;
    try {
      return await this.WorkingTimeRepo.save(newWorkingTime);
    } catch (error) {
      throw new HttpException(`Can't create workingTime: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, workingTimeDTO: WorkingTimeDTO): Promise<WorkingTime> {
    try {
      const workingtime = await this.WorkingTimeRepo.findOneOrFail(id);
      workingtime.start = workingTimeDTO.start;
      workingtime.end = workingTimeDTO.end;
      workingtime.description = workingTimeDTO.description;
      workingtime.billable = workingTimeDTO.billable;
      return await this.WorkingTimeRepo.save(workingtime);
    } catch (error) {
      throw new HttpException(`Can't update workingTime: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteById(id: number): Promise<WorkingTime> {
    try {
      const workingTime = await this.WorkingTimeRepo.findOneOrFail(id); // check if exists
      return await this.WorkingTimeRepo.remove(workingTime);
    } catch (error) {
      throw new HttpException(`Can't delete WorkingTime: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
