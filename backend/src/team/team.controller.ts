import {Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Post} from "@nestjs/common";
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
  private readonly logger = new Logger(TeamController.name);

  constructor(private teamService: TeamService) {
  }

  @ApiOperation({summary: "Get all my teams"})
  @Get()
  async getMeAll(@CurrentUser() user: User): Promise<Team[]> {
    this.logger.log("Get all my teams userId=", user.id);
    return await this.teamService.getUserTeams(user.id);
  }

  @ApiOperation({summary: "Get all teams"})
  @Roles(Role.GeneralManager, Role.Manager)
  @Get("all")
  async getAll(): Promise<Team[]> {
    this.logger.log("Get all teams");
    return await this.teamService.getAllTeams();
  }

  @ApiOperation({summary: "Get a team by id"})
  @Get(":teamId")
  async getMeOne(
    @CurrentUser() user: User,
    @Param("teamId", ParseIntPipe) teamId: number,
  ): Promise<Team> {
    this.logger.log("Get one of my team userId=", user.id, " teamId=", teamId);
    return await this.teamService.getUserTeam(user.id, teamId);
  }

  @ApiOperation({summary: "Get team by id"})
  @Roles(Role.GeneralManager, Role.Manager)
  @Get("one/:teamId")
  async getOne(@Param("teamId", ParseIntPipe) teamId: number): Promise<Team> {
    this.logger.log("Get one team teamId=", teamId);
    return await this.teamService.getTeamById(teamId);
  }

  @ApiOperation({summary: "Get all team of a user"})
  @Roles(Role.GeneralManager, Role.Manager)
  @Get("all/:userId")
  async getOneTeamByUserId(@Param("userId", ParseIntPipe) userId: number): Promise<Team[]> {
    this.logger.log("Get all teams by userId=", userId);
    return await this.teamService.getUserTeams(userId);
  }

  @ApiOperation({summary: "Create a team (manager/generalManager)"})
  @Roles(Role.GeneralManager, Role.Manager)
  @Post()
  async create(
    @CurrentUser() user: User,
    @Body() createTeamDTO: CreateTeamDTO
  ): Promise<Team> {
    this.logger.log("Create a team by userId=", user.id, "with", createTeamDTO);
    return await this.teamService.createTeam(user.id, createTeamDTO);
  }

  @ApiOperation({summary: "Delete a team by id (manager/generalManager)"})
  @Roles(Role.GeneralManager, Role.Manager)
  @Delete(":teamId")
  async delete(
    @CurrentUser() user: User,
    @Param("teamId", ParseIntPipe) teamId: number
  ): Promise<Team> {
    this.logger.log("Delete a team by userId=", user.id, "teamId=", teamId);
    return await this.teamService.deleteTeam(teamId, user.id);
  }

  @ApiOperation({summary: "Add a user to a team (manager/generalManager)"})
  @Roles(Role.GeneralManager, Role.Manager)
  @Post(":teamId/:userId")
  async addTeamUser(
    @Param("teamId", ParseIntPipe) teamId: number,
    @Param("userId", ParseIntPipe) userId: number,
  ): Promise<Team> {
    this.logger.log("Add a user to a team, teamId=", teamId, "userId=", userId);
    return await this.teamService.addUser(userId, teamId);
  }

  @ApiOperation({summary: "Remove a user from a team (manager/generalManager)"})
  @Roles(Role.GeneralManager, Role.Manager)
  @Delete(":teamId/:userId")
  async removeTeamUser(
    @CurrentUser() user: User,
    @Param("teamId", ParseIntPipe) teamId: number,
    @Param("userId", ParseIntPipe) userId: number,
  ): Promise<Team> {
    this.logger.log("Remove a user from a team, teamId=", teamId, "userId=", userId);
    return await this.teamService.removeUser(userId, teamId);
  }
}
