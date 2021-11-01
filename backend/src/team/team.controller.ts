import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post} from "@nestjs/common";
import {TeamService} from "./team.service";
import {CurrentUser} from "../auth/current-user.decorator";
import {User} from "../model/user.entity";
import {Team} from "../model/team.entity";
import {CreateTeamDTO} from "./team.dto";
import {Role} from "../role/role.utils";
import {Roles} from "../role/roles.decorator";
import {ApiOperation, ApiTags} from "@nestjs/swagger";

@Controller("team")
@ApiTags("team")
export class TeamController {
  constructor(private teamService: TeamService) {
  }

  @ApiOperation({summary: "Get all my teams"})
  @Get()
  async getMeAll(@CurrentUser() user: User): Promise<Team[]> {
    return await this.teamService.getUserTeams(user.id);
  }

  @ApiOperation({summary: "Get a team by id"})
  @Get(":teamId")
  async getMeOne(
    @CurrentUser() user: User,
    @Param("teamId", ParseIntPipe) teamId: number,
  ): Promise<Team> {
    return await this.teamService.getUserTeam(user.id, teamId);
  }

  @ApiOperation({summary: "Create a team (manager/generalManager)"})
  @Roles(Role.GeneralManager, Role.Manager)
  @Post()
  async create(
    @CurrentUser() user: User,
    @Body() createTeamDTO: CreateTeamDTO
  ): Promise<Team> {
    return await this.teamService.createTeam(user.id, createTeamDTO);
  }

  @ApiOperation({summary: "Delete a team by id (manager/generalManager)"})
  @Roles(Role.GeneralManager, Role.Manager)
  @Delete(":teamId")
  async delete(
    @CurrentUser() user: User,
    @Param("teamId", ParseIntPipe) teamId: number
  ): Promise<Team> {
    return await this.teamService.deleteTeam(teamId, user.id);
  }

  @ApiOperation({summary: "Add a user to a team (manager/generalManager)"})
  @Roles(Role.GeneralManager, Role.Manager)
  @Post(":teamId/:userId")
  async addTeamUser(
    @CurrentUser() user: User,
    @Param("teamId", ParseIntPipe) teamId: number,
    @Param("userId", ParseIntPipe) userId: number,
  ): Promise<Team> {
    return await this.teamService.addUser(user.id, userId, teamId);
  }

  @ApiOperation({summary: "Remove a user from a team (manager/generalManager)"})
  @Roles(Role.GeneralManager, Role.Manager)
  @Delete(":teamId/:userId")
  async removeTeamUser(
    @CurrentUser() user: User,
    @Param("teamId", ParseIntPipe) teamId: number,
    @Param("userId", ParseIntPipe) userId: number,
  ): Promise<Team> {
    return await this.teamService.removeUser(user.id, userId, teamId);
  }
}
