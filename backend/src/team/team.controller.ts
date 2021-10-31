import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post} from '@nestjs/common';
import {TeamService} from "./team.service";
import {CurrentUser} from "../auth/current-user.decorator";
import {User} from "../model/user.entity";
import {Team} from "../model/team.entity";
import {CreateTeamDTO} from "./team.requests";
import {Role} from "../role/role.utils";
import {Roles} from "../role/roles.decorator";
import {ApiTags} from "@nestjs/swagger";

@Controller('team')
@ApiTags('team')
export class TeamController {
  constructor(private teamService: TeamService) {
  }

  @Get()
  async getMeAll(@CurrentUser() user: User): Promise<Team[]> {
    return await this.teamService.getUserTeams(user.id);
  }

  @Get(':teamId')
  async getMeOne(
    @CurrentUser() user: User,
    @Param('teamId', ParseIntPipe) teamId: number,
  ): Promise<Team> {
    return await this.teamService.getUserTeam(user.id, teamId)
  }

  @Post()
  @Roles(Role.GeneralManager, Role.Manager)
  async create(
    @CurrentUser() user: User,
    @Body() createTeamDTO: CreateTeamDTO
  ): Promise<Team> {
    return await this.teamService.createTeam(user.id, createTeamDTO);
  }

  @Delete(':teamId')
  @Roles(Role.GeneralManager, Role.Manager)
  async delete(
    @CurrentUser() user: User,
    @Param('teamId', ParseIntPipe) teamId: number
  ): Promise<Team> {
    return await this.teamService.deleteTeam(teamId, user.id);
  }

  @Post(':teamId/:userId')
  @Roles(Role.GeneralManager, Role.Manager)
  async addTeamUser(
    @CurrentUser() user: User,
    @Param('teamId', ParseIntPipe) teamId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Team> {
    return await this.teamService.addUser(user.id, userId, teamId);
  }

  @Delete(':teamId/:userId')
  @Roles(Role.GeneralManager, Role.Manager)
  async removeTeamUser(
    @CurrentUser() user: User,
    @Param('teamId', ParseIntPipe) teamId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Team> {
    return await this.teamService.removeUser(user.id, userId, teamId);
  }
}
