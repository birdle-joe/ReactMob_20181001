
import React from 'react';
import { Layout, Row } from 'antd';
import { IBizPortalViewController } from 'ibizsys';
import './portal.less';
import {
  Db_portal,
  Db_portal_appmenu,
} from './portal.control';

export class PortalBase extends IBizPortalViewController {

    constructor(props: any, context: any, opt: any) {
        super(props, context, opt);
    }

    public render() {
        return (
            <Db_portal {...this.props} opts={{'viewController': this, 'name': 'db_portal', 'url': this.getBackendUrl()}} ref="db_portal" type="menu">
	    		<Db_portal_appmenu menuClick={this.onMenuClick} {...this.props} opts={{'viewController': this, 'name': 'db_portal_appmenu', 'url': this.getBackendUrl()}} ref="db_portal_appmenu"/>
            </Db_portal>
       );
    }

    public regAppFuncs(): void {
    }
  
    public appFuncTypeScript(funcId): void {
    }

    public regUICounters() : void {
    }

}