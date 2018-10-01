import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { IBizShellViewController } from 'ibizsys';
import DefaultCom from './tpmtraexammob-list-view';

class TPMTRAEXAMMobListViewShell extends IBizShellViewController {

    public render() {
        const { match } = this.props;
        return <Switch>
            <Route exact={true} path={match.path} component={DefaultCom} />
            <Route path={match.url + '/tpm_tpmtraexammobeditview/:params'} component={this.comCache.load('TPMTRAEXAMMobEditView', import('@pages/tpm/tpmtraexammob-edit-view/tpmtraexammob-edit-view.shell'))} />
        </Switch>;
    }

    protected getViewTitle(): string {
        return '学员考试报名移动端列表视图';
    }

}

export default withRouter(TPMTRAEXAMMobListViewShell);