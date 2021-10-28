import {Clock} from '../model/clock.entity';
import {EntityRepository, Repository} from 'typeorm';
import {User} from "../model/user.entity";

@EntityRepository(Clock)
export class ClockRepository extends Repository<Clock> {
  async getClockFromUser(user: User) {
    return await this.findOne({
      relations: ['user'],
      where: {user: {id: user.id}},
    });
  }
}