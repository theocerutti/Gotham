import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {DeleteResult, Repository, UpdateResult} from "typeorm";
import {WorkingTime} from "../model/workingtime.entity";
import {User} from "../model/user.entity";
import {WorkingTimeDTO} from "./working-time.requests";
import {Clock} from "../model/clock.entity";

@Injectable()
export class WorkingTimeService {
  @InjectRepository(WorkingTime) private readonly WorkingTimeRepo: Repository<WorkingTime>

  async create(user: User, workingTimeDTO: WorkingTimeDTO): Promise<WorkingTime> {
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

  async deleteById(id: number): Promise<DeleteResult> {
    try {
      return await this.WorkingTimeRepo.delete(id);
    } catch (error) {
      throw new HttpException(`Can't delete WorkingTime: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getWorkingTimesFromUser(user: User): Promise<WorkingTime[]> {
    return await this.WorkingTimeRepo.find({
      relations: ['user'],
      where: { user: { id: user.id } },
    });
  }
}
