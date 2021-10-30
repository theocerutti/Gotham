import {EntityRepository, Repository} from 'typeorm';
import {Team} from "../model/team.entity";

@EntityRepository(Team)
export class TeamRepository extends Repository<Team> {
  async getUserTeams(userId: number) {
    return await this.find({
      relations: ['user'],
      where: {user: {id: userId}},
    })
  }

  async getUserTeam(teamId: number, userId: number) {
    return await this.findOneOrFail(teamId, {
      relations: ['user'],
      where: {user: {id: userId}},
    });
  }
}