import {EntityRepository, Repository} from 'typeorm';
import {Team} from "../model/team.entity";

@EntityRepository(Team)
export class TeamRepository extends Repository<Team> {
}