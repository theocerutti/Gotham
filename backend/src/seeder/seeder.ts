import {Team} from "../model/team.entity";
import {WorkingTime} from "../model/workingtime.entity";
import {User} from "../model/user.entity";
import {Injectable} from "@nestjs/common";
import {Role} from "src/role/role.utils";
import {getRepository, Repository} from "typeorm";
import moment from "moment";
import * as faker from "faker";

const SEED_USER = 20;
const SEED_TEAM = 5;
const SEED_WORKING_TIME_BY_USER = 25;

const randomNum = (min, max): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

@Injectable()
export class Seeder {
  userRepo: Repository<User>;
  workingTimeRepo: Repository<WorkingTime>;
  teamRepo: Repository<Team>;

  buildSeeder() {
    this.userRepo = getRepository(User);
    this.workingTimeRepo = getRepository(WorkingTime);
    this.teamRepo = getRepository(Team);
  }

  async cleanDatabase() {
    await this.teamRepo.delete({});
    await this.workingTimeRepo.delete({});
    await this.userRepo.delete({});
  }

  async seedUsers(): Promise<User[]> {
    const users = [];

    // create one admin
    const admin: User = new User();
    admin.username = "admin";
    admin.email = "admin@email.com";
    admin.password = "admin";
    admin.role = Role.GeneralManager;
    users.push(await this.userRepo.save(admin));

    for (let i = 0; i < SEED_USER; i++) {
      const user = new User();
      user.username = faker.name.findName();
      user.email = faker.internet.email();
      user.password = faker.internet.password();
      user.role = i % 5 !== 0 ? Role.User : Role.Manager;
      users.push(await this.userRepo.save(user));
    }
    return users;
  }

  createRandomMomentDate(): moment.Moment {
    try {
      const endTime = moment();
      const randomNumber = (to, from = 0) => Math.floor(Math.random() * (to - from) + from);

      return moment(randomNumber(endTime));
    } catch (e) {
    }
  }

  async createRandomWorkingTime(user: User): Promise<WorkingTime> {
    const workingTime = new WorkingTime();
    const startMoment = this.createRandomMomentDate();
    workingTime.user = user;
    workingTime.description = faker.lorem.sentence(1);
    workingTime.start = startMoment.toDate();
    workingTime.end = startMoment
      .add(randomNum(0, 24), "hours")
      .add(randomNum(0, 60), "minute")
      .add(randomNum(0, 60), "seconds").toDate();
    workingTime.billable = Math.random() > 0.5;
    return workingTime;
  }

  async seedWorkingTimes(users: User[]) {
    for (const user of users) {
      const workingTimes = [];
      for (let i = 0; i < SEED_WORKING_TIME_BY_USER; i++)
        workingTimes.push(this.createRandomWorkingTime(user));
      user.workingtimes = workingTimes;
      await this.userRepo.save(user);
    }
  }

  async seedTeams(users: User[]) {
    const teams = [];

    for (let i = 0; i < SEED_TEAM; i++) {
      const team = new Team();
      const teamUsers = users.map(() => users[Math.random() * users.length | 0]);
      const ids = teamUsers.map(user => user.id);
      team.users = teamUsers.filter((user, index) => !ids.includes(user.id, index + 1));
      teams.push(await this.teamRepo.save(team));
    }
    return teams;
  }

  async seed() {
    // call constructor-like
    this.buildSeeder();

    // clean db
    await this.cleanDatabase();

    // seeds
    const seededUsers = await this.seedUsers();
    await this.seedWorkingTimes(seededUsers);
    const seededTeams = await this.seedTeams(seededUsers);
  }
}