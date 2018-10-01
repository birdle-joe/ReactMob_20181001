import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { IBizRouteView, IBizIndexViewController, IBizUICounter } from 'ibizsys';
import DefaultLayout from '@layout/default-layout/default-layout';
import { 
  AppMenu,
} from './index.control';

@IBizRouteView('首页')
export class IndexBase extends IBizIndexViewController {

    constructor(props: any, context: any, opt: any) {
        super(props, context, opt);
    }

    public render() {
        const { match, location } = this.props;
        return (
              <AppMenu  {...this.props}  opts={{'viewController': this, 'name': 'appmenu', 'url': this.getBackendUrl()}} ref="appmenu"  type="navmenu"  menuClick={this.onMenuClick}  >
                <Switch>
                    <Route path={match.url + '/wechat_weclasstaskmobcalendarview/:params'} component={this.loadAsyncComponent('WEClassTaskMobCalendarView', import('@pages/wechat/weclass-task-mob-calendar-view/weclass-task-mob-calendar-view.shell'))} />
                    <Route path={match.url + '/base_portal/:params'} component={this.loadAsyncComponent('Portal', import('@pages/base/portal/portal.shell'))} />
                    <Route path={match.url + '/base_portaltpm/:params'} component={this.loadAsyncComponent('PortalTPM', import('@pages/base/portal-tpm/portal-tpm.shell'))} />
                    <Route path={match.url + '/tpm_tpmtraexcusemobeditview/:params'} component={this.loadAsyncComponent('TPMTRAEXCUSEMobEditView', import('@pages/tpm/tpmtraexcusemob-edit-view/tpmtraexcusemob-edit-view.shell'))} />
                    <Route path={match.url + '/tpm_tpmtrabasemobeditview/:params'} component={this.loadAsyncComponent('TPMTRABASEMobEditView', import('@pages/tpm/tpmtrabasemob-edit-view/tpmtrabasemob-edit-view.shell'))} />
                    <Route path={match.url + '/wechat_weclasstaskmobeditview/:params'} component={this.loadAsyncComponent('WEClassTaskMobEditView', import('@pages/wechat/weclass-task-mob-edit-view/weclass-task-mob-edit-view.shell'))} />
                    <Route path={match.url + '/tpm_tpmtraexammobeditview/:params'} component={this.loadAsyncComponent('TPMTRAEXAMMobEditView', import('@pages/tpm/tpmtraexammob-edit-view/tpmtraexammob-edit-view.shell'))} />
                   
            </Switch>
               </AppMenu>
        );
    }

    /**
     * 注册计数器
     * 
     * @memberof IndexComponentBase
     */
    public regUICounters(): void {
        const Portal = new IBizUICounter(this.props, this.context, {
            viewController: this, 
            name: 'Portal', 
            counterId: '2cfc5bba445f0d9908920a83e87ab1c9', 
            tag: '956f2c99da31bb9d03e1160e9a90b130', 
            counterParam: {}, 
            timer: 60000,
            url: this.getBackendUrl()
        });
        this.regUICounter('Portal', Portal);
    }

}