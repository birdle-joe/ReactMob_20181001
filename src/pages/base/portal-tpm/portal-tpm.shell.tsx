import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { IBizShellViewController } from 'ibizsys';
import DefaultCom from './portal-tpm';

class PortalTPMShell extends IBizShellViewController {

    public render() {
        const { match } = this.props;
        return <Switch>
            <Route exact={true} path={match.path} component={DefaultCom} />
            <Route path={match.url + '/tpm_tpmtrabasemoblistview/:params'} component={this.comCache.load('TPMTRABASEMobListView', import('@pages/tpm/tpmtrabasemob-list-view/tpmtrabasemob-list-view.shell'))} />
            <Route path={match.url + '/tpm_tpmtraexammoblistview/:params'} component={this.comCache.load('TPMTRAEXAMMobListView', import('@pages/tpm/tpmtraexammob-list-view/tpmtraexammob-list-view.shell'))} />
            <Route path={match.url + '/tpm_tpmtraexcusemoblistview/:params'} component={this.comCache.load('TPMTRAEXCUSEMobListView', import('@pages/tpm/tpmtraexcusemob-list-view/tpmtraexcusemob-list-view.shell'))} />
        </Switch>;
    }

    protected getViewTitle(): string {
        return '集训星';
    }

}

export default withRouter(PortalTPMShell);