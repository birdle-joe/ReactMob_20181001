
import React from 'react';
import { Layout, Row } from 'antd';
import { IBizPortalViewController } from 'ibizsys';
import './portal-tpm.less';
import {
  Db_portaltpm,
  Db_portaltpm_appmenu,
} from './portal-tpm.control';

export class PortalTPMBase extends IBizPortalViewController {

    constructor(props: any, context: any, opt: any) {
        super(props, context, opt);
    }

    public render() {
        return (
            <Db_portaltpm {...this.props} opts={{'viewController': this, 'name': 'db_portaltpm', 'url': this.getBackendUrl()}} ref="db_portaltpm" type="menu">
	    		<Db_portaltpm_appmenu menuClick={this.onMenuClick} {...this.props} opts={{'viewController': this, 'name': 'db_portaltpm_appmenu', 'url': this.getBackendUrl()}} ref="db_portaltpm_appmenu"/>
            </Db_portaltpm>
       );
    }

    public regAppFuncs(): void {
        this.regAppFunc('DBF49962-4CF2-4F80-B23A-846B0A8A4293', {funcid:'DBF49962-4CF2-4F80-B23A-846B0A8A4293', functype:'APPVIEW', openmode:'INDEXVIEWTAB', className:'TPMTRABASEMobListView', viewParam:{}});
        this.regAppFunc('67C37AD6-87E3-4C6F-BCD2-F7DB0864C97C', {funcid:'67C37AD6-87E3-4C6F-BCD2-F7DB0864C97C', functype:'APPVIEW', openmode:'INDEXVIEWTAB', className:'TPMTRAEXAMMobListView', viewParam:{}});
        this.regAppFunc('8AE7D4B0-07ED-4119-8ECE-B32CE9F92170', {funcid:'8AE7D4B0-07ED-4119-8ECE-B32CE9F92170', functype:'APPVIEW', openmode:'INDEXVIEWTAB', className:'TPMTRAEXCUSEMobListView', viewParam:{}});
    }
  
    public appFuncTypeScript(funcId): void {
    }

    public regUICounters() : void {
    }

}