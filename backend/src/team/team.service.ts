import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {TeamRepository} from "./team.repository";

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(TeamRepository) private readonly TeamRepository: TeamRepository,
  ) {
  }
}
