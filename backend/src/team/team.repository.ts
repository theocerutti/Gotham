import {EntityNotFoundError, EntityRepository, Repository} from "typeorm";
import {Team} from "../model/team.entity";

@EntityRepository(Team)
export class TeamRepository extends Repository<Team> {
  async getUserTeams(teamIds: number[]): Promise<Team[]> {
    return await this.findByIds(teamIds, {
      relations: ["users"]
    });
  }

  async getUserTeam(teamId: number, teamIds: number[]): Promise<Team> {
    const teams = await this.getUserTeams(teamIds);
    const team = teams.find(team => team.id === teamId);
    console.log("add user team 2", teamIds)
    if (!team)
      throw new EntityNotFoundError(Team, `teamId = ${teamId}`);
    return team;
  }
}