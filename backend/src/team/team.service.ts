import {forwardRef, HttpException, HttpStatus, Inject, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {TeamRepository} from "./team.repository";
import {Team} from "../model/team.entity";
import {CreateTeamDTO} from "./team.dto";
import {UserService} from "../user/user.service";

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(TeamRepository) private readonly TeamRepository: TeamRepository,
    @Inject(forwardRef(() => UserService)) private userService: UserService
  ) {
  }

  async getAllTeams(): Promise<Team[]> {
    try {
      return await this.TeamRepository.find();
    } catch (error) {
      throw new HttpException(`Can't get all user teams: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getUserTeams(userId: number): Promise<Team[]> {
    try {
      const teamIds = await this.userService.getUserTeamsIds(userId);
      return await this.TeamRepository.getUserTeams(teamIds);
    } catch (error) {
      throw new HttpException(`Can't get all user teams: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getUserTeam(userId: number, teamId: number): Promise<Team> {
    try {
      const teamIds = await this.userService.getUserTeamsIds(userId);
      return await this.TeamRepository.getUserTeam(teamId, teamIds);
    } catch (error) {
      throw new HttpException(`Can't get user team: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getTeamById(teamId: number): Promise<Team> {
    try {
      return await this.TeamRepository.findOneOrFail(teamId, {
        relations: ["users"]
      });
    } catch (error) {
      throw new HttpException(`Can't get team by id: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createTeam(userId: number, createTeamDTO: CreateTeamDTO): Promise<Team> {
    try {
      const users = await this.userService.getByIds(createTeamDTO.userIds);
      const team = new Team();
      team.users = users;
      team.name = createTeamDTO.name;
      return await this.TeamRepository.save(team);
    } catch (error) {
      throw new HttpException(`Can't create team: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteTeam(teamId: number, userId: number): Promise<Team> {
    try {
      const team = await this.getUserTeam(userId, teamId);
      return await this.TeamRepository.remove(team);
    } catch (error) {
      throw new HttpException(`Can't remove team: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async addUser(userId: number, teamId: number): Promise<Team> {
    try {
      const team = await this.getTeamById(teamId);
      const user = await this.userService.getById(userId);
      team.addUser(user);
      return await this.TeamRepository.save(team);
    } catch (error) {
      throw new HttpException(`Can't add user: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async removeUser(userId: number, teamId: number): Promise<Team> {
    try {
      const team = await this.getTeamById(teamId);
      team.users = team.users.filter(user => user.id != userId);
      return this.TeamRepository.save(team);
    } catch (error) {
      throw new HttpException(`Can't remove user: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
