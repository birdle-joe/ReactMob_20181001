import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { IBizShellViewController } from 'ibizsys';
import DefaultCom from './tpmtraexcusemob-edit-view';

class TPMTRAEXCUSEMobEditViewShell extends IBizShellViewController {

    public render() {
        const { match } = this.props;
        return <Switch>
            <Route exact={true} path={match.path} component={DefaultCom} />
        </Switch>;
    }

    protected getViewTitle(): string {
        return '学员请假管理移动端编辑视图';
    }

}

export default withRouter(TPMTRAEXCUSEMobEditViewShell);