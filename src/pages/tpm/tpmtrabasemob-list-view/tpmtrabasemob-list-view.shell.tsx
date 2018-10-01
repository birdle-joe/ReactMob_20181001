import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { IBizShellViewController } from 'ibizsys';
import DefaultCom from './tpmtrabasemob-list-view';

class TPMTRABASEMobListViewShell extends IBizShellViewController {

    public render() {
        const { match } = this.props;
        return <Switch>
            <Route exact={true} path={match.path} component={DefaultCom} />
            <Route path={match.url + '/tpm_tpmtrabasemobeditview/:params'} component={this.comCache.load('TPMTRABASEMobEditView', import('@pages/tpm/tpmtrabasemob-edit-view/tpmtrabasemob-edit-view.shell'))} />
        </Switch>;
    }

    protected getViewTitle(): string {
        return '集训学员移动端列表视图';
    }

}

export default withRouter(TPMTRABASEMobListViewShell);