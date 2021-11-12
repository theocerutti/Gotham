import * as moment from 'moment';
import { WorkingTime } from './../model/workingtime.entity';
export class UserDashboardFormater {

  static format(workingTimes: Array<WorkingTime>){
    const hoursCurrentWeek = this.getHoursCurrentWeek(workingTimes);
    const hoursLastWeeks = this.getHoursLastWeeks(workingTimes);
    const generalMetrics = this.getGeneralMetrics(workingTimes)
    const minDate = this.getMinDate(workingTimes)

    return {
      workingTimes: workingTimes,
      hoursCurrentWeek: hoursCurrentWeek,
      hoursLastWeeks: hoursLastWeeks,
      generalMetrics: generalMetrics,
      minDate: minDate
    }
  }

  
  static getHoursCurrentWeek(workingTimes: Array<WorkingTime>){

    const currentWeekWT = workingTimes.filter(workingtime => {
      return workingtime.start >= moment().startOf("isoWeek").toDate() && workingtime.end <= moment().toDate();
    });

    //group by day
    const workingTimesSortedByDays = {}

    for(const wt of currentWeekWT){
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
      hoursInWeek.push(hours.toFixed(1))
    }
    return hoursInWeek
  }

  static getHoursLastWeeks(workingTimes: Array<WorkingTime>){

    const lastWeeksWT = workingTimes.filter(workingtime => {
      return workingtime.start >= moment().subtract(4, "weeks").startOf("week").toDate() &&  workingtime.start <= moment().subtract(1, "weeks").endOf('isoWeek').toDate();
    })
    //group by week
    const workingTimesSortedByWeeks = {}
    const labels = []

    for(const wt of lastWeeksWT){
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
      hoursInMonth.push(hours.toFixed(1))
    }
    return {labels: labels, dataset: hoursInMonth}
  }

  static getGeneralMetrics(workingTimes: Array<WorkingTime>){
    var totalHours = 0
    var totalHoursThisMonth = 0

    const thisMonthWT = workingTimes.filter(workingtime => {
      return workingtime.start >= moment().startOf('month').toDate() && moment().toDate();
    });

    for(const wt of workingTimes){
      totalHours += Math.abs(wt.start.getTime() - wt.end.getTime() ) / 36e5
    }

    for(const wt of thisMonthWT){
      totalHoursThisMonth += (Math.abs(wt.start.getTime() - wt.end.getTime() ) / 36e5)
    }

    return {totalHours: totalHours.toFixed(1), totalHoursThisMonth: totalHoursThisMonth.toFixed(1)}
  }

  static getStringCurrentWeek(date: Date){
    const firstday = moment(date).startOf('isoWeek').format("DD/MM/YYYY");
    const lastday = moment(date).endOf('isoWeek').format("DD/MM/YYYY");
    return `${firstday} - ${lastday}`
  }

  static getMinDate(workingTimes: Array<WorkingTime>){
    let dates = workingTimes.map(wt => moment(wt.start))
    return moment.min(dates).format("YYYY-MM-DD")
  }
}