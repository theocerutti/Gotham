import {Team} from "../model/team.entity";
import {WorkingTime} from "../model/workingtime.entity";
import {User} from "../model/user.entity";
import {Injectable, Logger} from "@nestjs/common";
import {Role} from "src/role/role.utils";
import {getRepository, Repository} from "typeorm";
import * as moment from "moment";
import * as faker from "faker";

const SEED_USER = 20;
const SEED_TEAM = 5;
const SEED_WORKING_TIME = ['month'];

const randomNum = (min, max): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

@Injectable()
export class Seeder {
  private readonly logger = new Logger(Seeder.name);

  userRepo: Repository<User>;
  workingTimeRepo: Repository<WorkingTime>;
  teamRepo: Repository<Team>;

  buildSeeder() {
    this.logger.log("Getting repositories...");
    this.userRepo = getRepository(User);
    this.workingTimeRepo = getRepository(WorkingTime);
    this.teamRepo = getRepository(Team);
  }

  async cleanDatabase() {
    this.logger.log("Clean database...");
    await this.teamRepo.delete({});
    await this.workingTimeRepo.delete({});
    await this.userRepo.delete({});
  }

  async seedUsers(): Promise<User[]> {
    this.logger.log("Seed users...");
    const users = [];

    // create one admin
    const admin: User = new User();
    admin.username = "admin";
    admin.email = "admin@email.com";
    admin.password = "admin";
    admin.role = Role.GeneralManager;
    users.push(admin);

    // and create manager/user
    for (let i = 0; i < SEED_USER; i++) {
      const user = new User();
      user.username = faker.name.findName();
      user.email = faker.internet.email();
      user.password = 'userpassword';
      user.role = i % 5 !== 0 ? Role.User : Role.Manager;
      users.push(user);
    }
    return await this.userRepo.save(users);
  }

  // createRandomMomentDate(): moment.Moment {
  //   const startTime = moment().startOf('isoWeek')
  //   const endTime = moment().endOf('isoWeek');
  //   const randomNumber = (to, from) => Math.floor(Math.random() * (to - from) + from);
  //   return moment(randomNumber(startTime, endTime));
  // }

  getDays(range){
    switch(range){
      case 'month':
        var start = moment().subtract(1, 'months').startOf('month');
        var end = moment();
    }

    var days = [];
    var day = start;

    while (day <= end) {
      if(day.day() !== 0 && day.day() !== 6){
        days.push(day.toDate());
      }
      day = day.clone().add(1, 'day');
    }

    return days
  }

  randomizeDurationWt(wt: WorkingTime): WorkingTime {

    wt.start = moment(wt.start)
      .set("hours", randomNum(0, 23))
      .set("minutes", randomNum(0, 59))
      .set("seconds", randomNum(0, 59))
      .toDate();

    wt.end = moment(wt.start)
      .set("hours", wt.start.getHours() + randomNum(0, 23 - wt.start.getHours()))
      .set("minutes", Math.min(wt.start.getMinutes() + randomNum(0, 59), 59))
      .set("seconds", Math.min(wt.start.getSeconds() + randomNum(0, 59), 59)).toDate();

    return wt;
  }

  createRandomWorkingTime(user: User, day): WorkingTime {
    let workingTime = new WorkingTime();
    workingTime.start = day;
    workingTime.user = user;
    workingTime.description = faker.lorem.sentences(1);
    workingTime = this.randomizeDurationWt(workingTime);
    workingTime.billable = Math.random() > 0.5;
    return workingTime;
  }

  async seedWorkingTimes(users: User[]) {
    this.logger.log("Seed user working times...");
    for (const user of users) {
      const workingTimes = [];
      for (const range of SEED_WORKING_TIME) {
        const days = this.getDays(range)
        for(const day of days){
          const wt = this.createRandomWorkingTime(user, day);
          workingTimes.push(wt);
        }
      }
      await this.workingTimeRepo.save(workingTimes);
    }
  }

  async seedTeams(users: User[]) {
    this.logger.log("Seed user teams...");
    const teams = [];

    for (let i = 0; i < SEED_TEAM; i++) {
      const team = new Team();
      const teamUsers = users.map(() => users[Math.random() * users.length | 0]);
      const ids = teamUsers.map(user => user.id);
      team.users = users.filter((user, index) => !ids.includes(user.id, index + 1));
      team.name = faker.name.jobArea();
      teams.push(team);
    }
    return await this.teamRepo.save(teams);
  }

  async seed() {
    // call constructor-like
    this.buildSeeder();

    // clean db
    await this.cleanDatabase();

    // seeds
    const seededUsers = await this.seedUsers();
    await this.seedWorkingTimes(seededUsers);
    await this.seedTeams(seededUsers);
  }
}