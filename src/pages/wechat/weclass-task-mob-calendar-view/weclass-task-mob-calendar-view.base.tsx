
import React from 'react';
import { Input } from 'antd';
import { IBizCalendarViewController } from 'src/ibizsys/app/IBizCalendarViewController';
import './weclass-task-mob-calendar-view.less';
import { 
  Calendar,
} from './weclass-task-mob-calendar-view.control';

export class WEClassTaskMobCalendarViewBase extends IBizCalendarViewController {

    protected calendar: Calendar;

    constructor(props: any, context: any, opt: any) {
        super(props, context, opt);
    }

     public render() {
        return (<div>
						<Calendar {...this.props} opts={{'viewController': this, 'name': 'calendar', 'url': this.getBackendUrl()}} ref="calendar" />
        </div>);
    }

 
     
    /**
     * 获取新建视图
     * 
     * @param {any} arg 
     * @returns {*} 
     * @memberof WEClassTaskMobCalendarViewComponentBase
     */
    public getNewDataView(params: any): any {
        if (!params) {
            params={};
        }
        let newmode = params.srfnewmode;
        if (!newmode) {
            newmode = '';
        }
        
    }

    /**
     * 获取编辑视图
     * 
     * @param {any} arg 
     * @returns {*} 
     * @memberof WEClassTaskMobCalendarViewComponentBase
     */
    public getEditDataView(params: any): any {
        if (!params) {
            params={};
        }
           
        let list = [params.srfeditmode2,params.srfeditmode];
        for(let i=0;i<2;i++){
            let editmode = list[i];
            if (!editmode) {
                continue;
            }
        }

    }

}