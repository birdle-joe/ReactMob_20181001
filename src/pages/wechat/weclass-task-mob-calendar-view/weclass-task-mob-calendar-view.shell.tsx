import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { IBizShellViewController } from 'ibizsys';
import DefaultCom from './weclass-task-mob-calendar-view';

class WEClassTaskMobCalendarViewShell extends IBizShellViewController {

    public render() {
        const { match } = this.props;
        return <Switch>
            <Route exact={true} path={match.path} component={DefaultCom} />
            <Route path={match.url + '/wechat_weclasstaskmobeditview/:params'} component={this.comCache.load('WEClassTaskMobEditView', import('@pages/wechat/weclass-task-mob-edit-view/weclass-task-mob-edit-view.shell'))} />
        </Switch>;
    }

    protected getViewTitle(): string {
        return '微信训练计划日历移动端日历视图';
    }

}

export default withRouter(WEClassTaskMobCalendarViewShell);