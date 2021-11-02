import {Clock} from "../model/clock.entity";
import {EntityRepository, Repository} from "typeorm";

@EntityRepository(Clock)
export class ClockRepository extends Repository<Clock> {
  async getUserClock(userID: number) {
    return await this.findOneOrFail({
      relations: ["user"],
      where: {user: {id: userID}},
    });
  }
}