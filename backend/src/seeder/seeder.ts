import { Team } from './../model/team.entity';
import { WorkingTime } from './../model/workingtime.entity';
import { User } from '../model/user.entity';
import { Injectable } from "@nestjs/common";
import { Role } from 'src/role/role.utils';
import { getRepository } from 'typeorm';

@Injectable()
export class Seeder {

  async seed(){
    const userRepo = getRepository(User);
    const workingTimeRepo = getRepository(WorkingTime);
    const teamRepo = getRepository(Team);


    //delete tables' content
    userRepo.delete({});
    workingTimeRepo.delete({});
    teamRepo.delete({});

    const admin: User = new User();

    admin.username = "admin";
    admin.email = "admin@email.com";
    admin.password = "admin";
    admin.role = Role.GeneralManager;

    await userRepo.save(admin);

    const team1: Team = new Team();
    var team1Users = []


    for(let i=1; i<=5; i++){
      const user: User = new User();

      user.username = `user${i}`;
      user.email = `user${i}@gmail.com`;
      user.password = `user${i}`;
      user.role = Role.User;

      const userWithId =  await userRepo.save(user)
      console.log('userWithId:', userWithId)
      team1Users.push(userWithId)

      for (let j=1; j<=10;j++){
        const newWorkingTime : WorkingTime = new WorkingTime();
        newWorkingTime.start = new Date();
        newWorkingTime.end = new Date();
        newWorkingTime.description = ""
        newWorkingTime.billable = true;
        newWorkingTime.user = userWithId;
        await workingTimeRepo.save(newWorkingTime);
      }
    }

    team1.users = team1Users

    await teamRepo.save(team1);


    return

  }
}