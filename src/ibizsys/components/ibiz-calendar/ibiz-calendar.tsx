import React, { Component } from "react";
import './ibiz-calendar.less';
import CalendarMain from './ibiz-calendar-main';
import { displayDaysPerMonth, changeMonthToDate } from './ibiz-calendar-dayUtil';
import { Icon } from 'antd-mobile';
import { IBizControl } from "src/ibizsys/widget/IBizControl";

export class IBizCalendar extends IBizControl {

    private year: any;
    private month: any;
    private day: any;
    private viewData: any;

    constructor(props: any, context: any, opts: any = {}) {
        super(props, context, opts);
        const default_date = new Date();
        this.year = default_date.getFullYear();
        this.month = default_date.getMonth() + 1;
        this.day = default_date.getDate();
    }
    public prevMonth() {
        let data = changeMonthToDate(this.year, this.month, this.day, false);
        this.year = data.year;
        this.month = data.month;
        this.day = data.day;
        this.load(data);
    }

    public nextMonth() {

        this.setState({ up_img_url: 'up_month' });
        let data = changeMonthToDate(this.year, this.month, this.day, true);
        this.year = data.year;
        this.month = data.month;
        this.day = data.day;
        this.load(data);
    }

    public onDatePickListener(day: any) {
        this.setState({ day })
    }
    public onChangeDateListener(data: any) {
    }


    public load(arg: any = {}): void {
        let opt: any = {};
        Object.assign(opt, arg);
        Object.assign(opt, { srfctrlid: this.getName(), srfaction: 'fetch', srfbegintime: '2018-09-01 12:00:00', srfendtime: '2018-09-31 12:00:00' });

        this.post(opt)
            .subscribe(
                (response: any = {}) => {
                    if (!response.items || response.ret !== 0) {
                        if (response.errorMessage) {
                            this.showToast(this.$showErrorToast, '', response.errorMessage);
                        }
                        return;
                    }
                    this.fillDataSource(response.items);
                },
                error => {
                    console.log(error.info);
                }
            );
    }

    public fillDataSource = (item: any) => {

        let viewDataArr = displayDaysPerMonth(this.year, item);
        this.viewData = viewDataArr;
        this.tick();
    }

    public render() {
        let props = {
            viewData: this.viewData
        };

        if(!this.viewData)
        {
            return <div/>;
        }
        return (
            <div className="base_column">
                <div ref='Head' className="calendar_title_layout" >
                    <div className="leftIcon"><Icon type="left" id="prevMonth" onClick={this.prevMonth.bind(this, '2')} className="calendar_img"> </Icon></div>
                    <div className="calendar_title">{this.year + '年' + (this.month < 10 ? '0' + this.month : this.month) + '月' + (this.day < 10 ? '0' + this.day : this.day) + '日'}</div>
                    <div className="rightIcon"><Icon type="right" id="nextMonth" onClick={this.nextMonth.bind(this, '3')} className="calendar_img"> </Icon></div>
                </div>

                <CalendarMain {...props}
                    ref='CalendarMain'
                    onDatePickListener={this.onDatePickListener.bind(this, '4')}
                    onChangeDateListener={this.onChangeDateListener.bind(this, '5')}
                    year={this.year}
                    month={this.month}
                    day={this.day}
                />
            </div>
        );
    }
}