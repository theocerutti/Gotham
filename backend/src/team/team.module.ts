import {Module} from '@nestjs/common';
import {TeamController} from './team.controller';
import {TeamService} from './team.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TeamRepository} from "./team.repository";
import {Team} from "../model/team.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Team, TeamRepository]),
  ],
  controllers: [TeamController],
  providers: [TeamService],
  exports: [TeamService]
})
export class TeamModule {
}
