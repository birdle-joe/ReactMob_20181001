import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { IBizShellViewController } from 'ibizsys';
import DefaultCom from './tpmtrabasemob-edit-view';

class TPMTRABASEMobEditViewShell extends IBizShellViewController {

    public render() {
        const { match } = this.props;
        return <Switch>
            <Route exact={true} path={match.path} component={DefaultCom} />
        </Switch>;
    }

    protected getViewTitle(): string {
        return '集训学员移动端编辑视图';
    }

}

export default withRouter(TPMTRABASEMobEditViewShell);