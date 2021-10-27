import {forwardRef, HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import { WorkingTimeService } from '../working-time/working-time.service';
import {Repository} from 'typeorm';
import {Clock} from "../model/clock.entity";
import {User} from "../model/user.entity";
import {ClockDTO} from "./clock-requests";

@Injectable()
export class ClockService {
  @InjectRepository(Clock) private readonly ClockRepo: Repository<Clock>
  constructor( @Inject(forwardRef(() => WorkingTimeService)) private workingTimeService: WorkingTimeService) {}

  async create(user: User, clockDTO: ClockDTO): Promise<Clock> {
    let newClock = new Clock();
    newClock.status = clockDTO.status;
    newClock.time = clockDTO.time;
    newClock.user = user;
    try {
      return await this.ClockRepo.save(newClock);
    } catch (error) {
      throw new HttpException(`Can't create clock: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(clock: Clock): Promise<Clock> {
    try {
      return await this.ClockRepo.save(clock);
    } catch (error) {
      throw new HttpException(`Can't update clock: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createWorkingTime(user, workingTimeDTO){
    return await this.workingTimeService.create(user, workingTimeDTO)
  }

  async getClockFromUser(user: User): Promise<Clock> {
    return await this.ClockRepo.findOne({
      relations: ['user'],
      where: { user: { id: user.id } },
    });
  }
}
