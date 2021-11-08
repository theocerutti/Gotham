import { WorkingTime } from './../model/workingtime.entity';
export class UserDashboardFormater {
  static getHoursInWeek(workingTimes: Array<WorkingTime>){
    var hoursInWeek = []
    workingTimes.forEach((workingTime) =>{
      hoursInWeek.push(workingTime.start)
    })
    return hoursInWeek
  }
}