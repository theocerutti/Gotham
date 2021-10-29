import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {TeamRepository} from "./team.repository";
import {Team} from "../model/team.entity";

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(TeamRepository) private readonly TeamRepository: TeamRepository,
  ) {
  }

  async getUserTeams(userId: number): Promise<Team[]> {
    try {
      return await this.TeamRepository.getUserTeams(userId);
    } catch (error) {
      throw new HttpException(`Can't get all user teams: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getUserTeam(userId: number, teamId: number): Promise<Team> {
    try {
      return await this.TeamRepository.findOneOrFail(teamId, {
        where: {user: {id: userId}}
      })
    } catch (error) {
      throw new HttpException(`Can't get user team: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
