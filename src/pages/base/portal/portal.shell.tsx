import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { IBizShellViewController } from 'ibizsys';
import DefaultCom from './portal';

class PortalShell extends IBizShellViewController {

    public render() {
        const { match } = this.props;
        return <Switch>
            <Route exact={true} path={match.path} component={DefaultCom} />
        </Switch>;
    }

    protected getViewTitle(): string {
        return '微门户';
    }

}

export default withRouter(PortalShell);