import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Clock} from "../model/clock.entity";
import {User} from "../model/user.entity";
import {ClockDTO} from "./clock-requests";
import {UpdateResult} from "typeorm/query-builder/result/UpdateResult";

@Injectable()
export class ClockService {
  @InjectRepository(Clock) private readonly ClockRepo: Repository<Clock>

  async create(user: User, clockDTO: ClockDTO): Promise<Clock> {
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
}
