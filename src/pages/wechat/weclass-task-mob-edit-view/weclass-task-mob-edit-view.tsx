import { withRouter } from 'react-router-dom';
import { WEClassTaskMobEditViewBase } from './weclass-task-mob-edit-view.base';
import './weclass-task-mob-edit-view.less';

class WEClassTaskMobEditView extends WEClassTaskMobEditViewBase {

    constructor(props: any, context: any) {
        super(props, context, {
            url: '/WeChat/wechat/WEClassTaskMobEditView.do'
        });
    }

}

export default withRouter(WEClassTaskMobEditView);