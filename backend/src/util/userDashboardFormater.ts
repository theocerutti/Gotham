import { WorkingTime } from './../model/workingtime.entity';
export class UserDashboardFormater {
  static getHoursInWeek(workingTimes: Array<WorkingTime>){

    //group by day
    const workingTimesSortedByDays = {}

    for(const wt of workingTimes){
      const dateKey = wt.start.getDay();
      if (!workingTimesSortedByDays[dateKey])
        workingTimesSortedByDays[dateKey] = [];
      workingTimesSortedByDays[dateKey].push(wt);
    }

    //sum hours
    var hoursInWeek = []
    for(const day in workingTimesSortedByDays){
      var hours = 0
      for(const wt of workingTimesSortedByDays[day]){
        hours += Math.abs(wt.start.getTime() - wt.end.getTime() ) / 36e5
      }
      hoursInWeek.push(hours.toFixed(2))
    }
    return hoursInWeek
  }
}