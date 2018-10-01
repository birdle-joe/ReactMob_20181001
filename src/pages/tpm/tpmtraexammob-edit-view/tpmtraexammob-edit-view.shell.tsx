import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { IBizShellViewController } from 'ibizsys';
import DefaultCom from './tpmtraexammob-edit-view';

class TPMTRAEXAMMobEditViewShell extends IBizShellViewController {

    public render() {
        const { match } = this.props;
        return <Switch>
            <Route exact={true} path={match.path} component={DefaultCom} />
        </Switch>;
    }

    protected getViewTitle(): string {
        return '学员考试报名移动端编辑视图';
    }

}

export default withRouter(TPMTRAEXAMMobEditViewShell);