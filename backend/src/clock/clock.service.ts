import {forwardRef, HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {WorkingTimeService} from '../working-time/working-time.service';
import {Clock} from "../model/clock.entity";
import {ClockDTO} from "./clock.requests";
import {ClockRepository} from "./clock.repository";
import {UserService} from "../user/user.service";
import {WorkingTimeDTO} from "../working-time/working-time.requests";

@Injectable()
export class ClockService {
  constructor(
    @InjectRepository(ClockRepository) private readonly ClockRepo: ClockRepository,
    @Inject(forwardRef(() => WorkingTimeService)) private workingTimeService: WorkingTimeService,
    @Inject(forwardRef(() => UserService)) private userService: UserService
  ) {
  }

  async create(userId: number, clockDTO: ClockDTO): Promise<Clock> {
    const user = await this.userService.getById(userId);
    let newClock = new Clock();
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

  async createWorkingTime(userID: number, workingTimeDTO: WorkingTimeDTO) {
    try {
      return await this.workingTimeService.create(userID, workingTimeDTO);
    } catch (error) {
      throw new HttpException(`Can't create working time: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getUserClockById(userID: number): Promise<Clock> {
    try {
      return await this.ClockRepo.getUserClock(userID);
    } catch (error) {
      throw new HttpException(`Can't get user clock: ${error.message}`, HttpStatus.NOT_FOUND);
    }
  }

  async switchClock(userID: number, clockDTO: ClockDTO): Promise<Clock> {
    let clock: Clock = null;
    try {
      clock = await this.getUserClockById(userID);
    } catch (error) { // not found
      clock = await this.create(userID, clockDTO); // create it
    }
    if (clock.status) {
      clock.time = clockDTO.time;
      clock.status = false;
    } else {
      clock.status = true;
      let workingTimeDTO = new WorkingTimeDTO();
      workingTimeDTO.start = clock.time;
      workingTimeDTO.end = clockDTO.time;
      await this.createWorkingTime(userID, workingTimeDTO);
    }
    return await this.update(clock);
  }
}
