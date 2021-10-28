import {forwardRef, HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {WorkingTime} from "../model/workingtime.entity";
import {WorkingTimeDTO, WorkingTimeRequestQuery} from "./working-time.requests";
import {WorkingTimeRepository} from "./working-time.repository";
import {UserService} from "../user/user.service";

@Injectable()
export class WorkingTimeService {
  constructor(
    @InjectRepository(WorkingTimeRepository) private readonly WorkingTimeRepo: WorkingTimeRepository,
    @Inject(forwardRef(() => UserService)) private userService: UserService
  ) {
  }

  async create(userID: number, workingTimeDTO: WorkingTimeDTO): Promise<WorkingTime> {
    const user = await this.userService.getById(userID);
    let newWorkingTime = new WorkingTime();
    newWorkingTime.start = workingTimeDTO.start;
    newWorkingTime.end = workingTimeDTO.end;
    newWorkingTime.user = user;
    try {
      return await this.WorkingTimeRepo.save(newWorkingTime);
    } catch (error) {
      throw new HttpException(`Can't create workingTime: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, workingTimeDTO: WorkingTimeDTO): Promise<WorkingTime> {
    try {
      let workingtime = await this.WorkingTimeRepo.findOneOrFail(id);
      workingtime.start = workingTimeDTO.start;
      workingtime.end = workingTimeDTO.end;
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
      throw new HttpException(`Can't delete WorkingTime: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR)
    }
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
      const user = await this.userService.getById(userID); // check if exists
      return await this.WorkingTimeRepo.findOneOrFail(workingTimeID, {
        where: {user: {id: user.id}}
      })
    } catch (error) {
      throw new HttpException(`Can't get user working time: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getUserWorkingTimesFromTimeRange(userID: number, query: WorkingTimeRequestQuery) {
    try {
      const workingTimes = await this.getUserWorkingTimes(userID);
      return workingTimes.filter(workingtime => {
        return workingtime.start >= new Date(query.start) && workingtime.end <= new Date(query.end);
      });
    } catch (error) {
      throw new HttpException(`Can't get user working time from timerange: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
