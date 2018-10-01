import moment from 'moment';


export const displayDaysPerMonth = (year: any, taskItem: any) => {
  let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    daysInMonth[1] = 29
  }

  let MonthArr: any = [];

  let daysInPreviousMonth = MonthArr.concat(daysInMonth);
  daysInPreviousMonth.unshift(daysInPreviousMonth.pop());

  let addDaysFromPreMonth = new Array(12)
    .fill(null)
    .map((item, index) => {
      let day = new Date(year, index, 1).getDay();
      if (day === 0) {
        return 7
      } else {
        return day
      }
    });

  let year_bean: any = getYearInstance(year);
  for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
    let addDays = addDaysFromPreMonth[monthIndex];
    let daysCount = daysInMonth[monthIndex];
    let daysCountPrevious = daysInPreviousMonth[monthIndex]
    let monthData: any = [];
    let month_bean: any = getMonthInstance(monthIndex + 1, year);

    for (; addDays > 0; addDays--) {
      let day_bean = getDayInstance(taskItem, daysCountPrevious--, monthIndex, year, false);
      monthData.unshift(day_bean)
    }
    for (let i = 1; i <= daysCount; i++) {
      let day_bean = getDayInstance(taskItem, i, monthIndex + 1, year, true);
      monthData.push(day_bean)
    }
    for (let i = 42 - monthData.length, j = 0; j < i;) {
      let day_bean = getDayInstance(taskItem, ++j, monthIndex + 2, year, false);
      monthData.push(day_bean)
    }

    month_bean.days.push(...monthData);
    year_bean.months.push(month_bean);
  }
  // logger(year_bean);
  return year_bean;
}


const getDayInstance = (taskitem: any, day: any, month: any, year: any, isCurrentMonth = false, isPost = false) => {

  let week = new Date(year, month, day).getDay();
  let months = month;
  let days = day;
  let isGetReport = false;
  let Todays = isToday(year, month, day);
  let flag =false;
  // let flag = isTaskday(taskitem, year, month, day);
  let taskList=getCurdayTaskList(taskitem,year, month, day);


  if (month < 10) {
    months = '0' + month;

  }
  if (day < 10) {
    days = '0' + day;
  }
  let All_date = year + '-' + months + '-' + days;
  return { day, month, year, week, isCurrentMonth, All_date, isPost, flag, Todays, isGetReport,taskList};

}

//  从任务列表中获取当天的任务信息
const getCurdayTaskList = (AllTaskList:any ,year: any, month: any, day: any): any => {

  let $format: string = 'YYYY-MM-DD HH:mm:ss';

  let curDayTaskList :any =[];

  if(AllTaskList instanceof Array)
  {
    AllTaskList.map((item,index)=>{
      let begintime = item.begintime;
      let taskdate = moment(begintime, $format).toDate();
      let task_year = taskdate.getFullYear();
      let task_month = taskdate.getMonth() + 1;
      let task_day = taskdate.getDate();

      if(year === task_year && month === task_month && day === task_day)
      {
        curDayTaskList.push(item);
      }
    })
  } 
  return curDayTaskList;
}


const isTaskday = (taskitem: any, cur_year: any, cur_month: any, cur_day: any): number => {

  let $format: string = 'YYYY-MM-DD HH:mm:ss';

  let flag=false;

  if (taskitem && (taskitem instanceof Array)) {


      flag = taskitem.some((item, index) => {
      let begintime = item.begintime;
      let taskdate = moment(begintime, $format).toDate();
      let task_year = taskdate.getFullYear();
      let task_month = taskdate.getMonth() + 1;
      let task_day = taskdate.getDate();

      return cur_year === task_year && cur_month === task_month && cur_day === task_day;

    })

  
  }
  if (flag) {
    return 1;
  }
  else {
    return -1;
  }

}

const isToday = (year: any, month: any, day: any): boolean => {
  let default_date = new Date();
  let cur_year = default_date.getFullYear();
  let cur_month = default_date.getMonth() + 1;
  let cur_day = default_date.getDate();
  if (year === cur_year && month === cur_month && day === cur_day) {
    return true;
  }
  else {
    return false;
  }
}


const getMonthInstance = (month: any, year: any) => {
  return { month, year, days: [] };
}


const getYearInstance = (year: any) => {
  return { year, months: [] }
}


export const changeMonthToDate = (curYear: any, curMonth: any, curDay: any, flag: any) => {


  let turn_year;
  let turn_month;
  // let turn_date;

  if (flag) {
    if (curMonth === 12) {
      turn_month = 1;
      turn_year = curYear + 1;
    }
    else {
      turn_year = curYear;
      turn_month = curMonth + 1;
    }
  }
  else {
    if (curMonth === 1) {
      turn_month = 12;
      turn_year = curYear - 1;
    }
    else {
      turn_year = curYear;
      turn_month = curMonth - 1;
    }
  }

  let data = { year: turn_year, month: turn_month, day: curDay }

  return data;
}
