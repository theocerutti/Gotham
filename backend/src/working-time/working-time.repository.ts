import {EntityRepository, Repository} from 'typeorm';
import {WorkingTime} from "../model/workingtime.entity";

@EntityRepository(WorkingTime)
export class WorkingTimeRepository extends Repository<WorkingTime> {
  async getUserWorkingTimes(userID: number) {
    return await this.find({
      relations: ['user'],
      where: {user: {id: userID}},
    });
  }
}