import {EntityNotFoundError, EntityRepository, Repository} from 'typeorm';
import {Team} from "../model/team.entity";

@EntityRepository(Team)
export class TeamRepository extends Repository<Team> {
  async getUserTeams(userId: number): Promise<Team[]> {
    return await this
      .createQueryBuilder('team')
      .leftJoinAndSelect(
        'team.users',
        'user',
        'user.id = :userId',
        {userId}
      )
      .getMany();
  }

  async getUserTeam(teamId: number, userId: number): Promise<Team> {
    const teams = await this.getUserTeams(userId);
    const team = teams.find(team => team.id === teamId);
    if (!team)
      throw new EntityNotFoundError(Team, `teamId = ${teamId} && userId = ${userId}`);
    return team;
  }
}