import { withRouter } from 'react-router-dom';
import { WEClassTaskMobCalendarViewBase } from './weclass-task-mob-calendar-view.base';
import './weclass-task-mob-calendar-view.less';

class WEClassTaskMobCalendarView extends WEClassTaskMobCalendarViewBase {

    constructor(props: any, context: any) {
        super(props, context, {
            url: '/WeChat/wechat/WEClassTaskMobCalendarView.do'
        });
    }

}

export default withRouter(WEClassTaskMobCalendarView);