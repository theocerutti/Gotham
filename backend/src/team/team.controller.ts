import {Controller, Get, Param, ParseIntPipe} from '@nestjs/common';
import {TeamService} from "./team.service";
import {CurrentUser} from "../auth/current-user.decorator";
import {User} from "../model/user.entity";
import {Team} from "../model/team.entity";

@Controller('team')
export class TeamController {
  constructor(private teamService: TeamService) {
  }

  @Get()
  async getMeAll(@CurrentUser() user: User): Promise<Team[]> {
    return await this.teamService.getUserTeams(user.id);
  }

  @Get('teamId')
  async getMeOne(
    @CurrentUser() user: User,
    @Param('teamId', ParseIntPipe) teamId: number,
  ): Promise<Team> {
    return await this.teamService.getUserTeam(user.id, teamId)
  }
}
