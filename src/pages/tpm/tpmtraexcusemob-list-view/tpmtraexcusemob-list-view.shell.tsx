import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { IBizShellViewController } from 'ibizsys';
import DefaultCom from './tpmtraexcusemob-list-view';

class TPMTRAEXCUSEMobListViewShell extends IBizShellViewController {

    public render() {
        const { match } = this.props;
        return <Switch>
            <Route exact={true} path={match.path} component={DefaultCom} />
            <Route path={match.url + '/tpm_tpmtraexcusemobeditview/:params'} component={this.comCache.load('TPMTRAEXCUSEMobEditView', import('@pages/tpm/tpmtraexcusemob-edit-view/tpmtraexcusemob-edit-view.shell'))} />
        </Switch>;
    }

    protected getViewTitle(): string {
        return '学员请假管理移动端列表视图';
    }

}

export default withRouter(TPMTRAEXCUSEMobListViewShell);