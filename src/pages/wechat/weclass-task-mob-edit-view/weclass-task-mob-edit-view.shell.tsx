import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { IBizShellViewController } from 'ibizsys';
import DefaultCom from './weclass-task-mob-edit-view';

class WEClassTaskMobEditViewShell extends IBizShellViewController {

    public render() {
        const { match } = this.props;
        return <Switch>
            <Route exact={true} path={match.path} component={DefaultCom} />
        </Switch>;
    }

    protected getViewTitle(): string {
        return '微信训练计划日历移动端编辑视图';
    }

}

export default withRouter(WEClassTaskMobEditViewShell);