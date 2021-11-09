import * as moment from 'moment';
import { WorkingTime } from './../model/workingtime.entity';
export class UserDashboardFormater {
  static getHoursCurrentWeek(workingTimes: Array<WorkingTime>){

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

  static getHoursLastWeek(workingTimes: Array<WorkingTime>){

    //group by week
    const workingTimesSortedByWeeks = {}
    const labels = []

    for(const wt of workingTimes){
      const dateKey = moment(wt.start).week();
      if (!workingTimesSortedByWeeks[dateKey]){
        workingTimesSortedByWeeks[dateKey] = [];
        labels.push(this.getStringCurrentWeek(wt.start))
      }
      workingTimesSortedByWeeks[dateKey].push(wt);
    }

    var hoursInMonth = []
    for(const week in workingTimesSortedByWeeks){
      var hours = 0
      for(const wt of workingTimesSortedByWeeks[week]){
        hours += Math.abs(wt.start.getTime() - wt.end.getTime() ) / 36e5
      }
      hoursInMonth.push(hours.toFixed(2))
    }
    return {labels: labels, dataset: hoursInMonth}
  }

  static getGeneralMetrics(workingTimes: Array<WorkingTime>){
    var totalHours = 0
    var totalHoursThisMonth = 0

    const wtThisMonth = workingTimes.filter(workingtime => {
      return workingtime.start >= moment().startOf('month').toDate() && moment().toDate();
    });

    for(const wt of workingTimes){
      totalHours += Math.abs(wt.start.getTime() - wt.end.getTime() ) / 36e5
    }

    for(const wt of wtThisMonth){
      totalHoursThisMonth += (Math.abs(wt.start.getTime() - wt.end.getTime() ) / 36e5)
    }

    return {totalHours: totalHours.toFixed(2), totalHoursThisMonth: totalHoursThisMonth.toFixed(2)}
  }

  static getStringCurrentWeek(date: Date){
    const firstday = moment(date).startOf('isoWeek').format("DD/MM/YYYY");
    const lastday = moment(date).endOf('isoWeek').format("DD/MM/YYYY");
    return `${firstday} - ${lastday}`
  }
}