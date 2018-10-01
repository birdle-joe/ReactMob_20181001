
import { IBizPortlet} from 'ibizsys';
import React from 'react';
import { IBizAppMenu } from 'ibizsys';

/**
 * 应用菜单部件服务对象
 * 
 * @export
 * @class Db_portaltpm_appmenu
 * @extends { IBizAppMenu }
 */
export class Db_portaltpm_appmenu extends IBizAppMenu {

    /**
     * Creates an instance of Db_portaltpm_appmenu.
     * 创建 Db_portaltpm_appmenu实例
     * 
     * @param {*} props
     * @param {*} context
     * @memberof Db_portaltpm_appmenu
     */
    constructor(props: any, context: any) {
        super(props, context,props.opts);
    }

    public regAppfuncs(): void {
        this.regAppfunc('DBF49962-4CF2-4F80-B23A-846B0A8A4293', {funcid: 'dbf49962-4cf2-4f80-b23a-846b0a8a4293', codename: 'tpm_tpmtrabasemoblistview', functype: 'APPVIEW', openmode: 'INDEXVIEWTAB', viewParams: {}});
        this.regAppfunc('67C37AD6-87E3-4C6F-BCD2-F7DB0864C97C', {funcid: '67c37ad6-87e3-4c6f-bcd2-f7db0864c97c', codename: 'tpm_tpmtraexammoblistview', functype: 'APPVIEW', openmode: 'INDEXVIEWTAB', viewParams: {}});
        this.regAppfunc('8AE7D4B0-07ED-4119-8ECE-B32CE9F92170', {funcid: '8ae7d4b0-07ed-4119-8ece-b32ce9f92170', codename: 'tpm_tpmtraexcusemoblistview', functype: 'APPVIEW', openmode: 'INDEXVIEWTAB', viewParams: {}});
    }

}

/**
 * 门户部件
 * 
 * @export
 * @class Db_portaltpm
 * @extends { IBizPortlet }
 */
export class Db_portaltpm extends IBizPortlet {

    /**
     * Creates an instance of Db_portaltpm.
     * 创建 Db_portaltpm实例
     * 
     * @param {*} props
     * @param {*} context
     * @memberof Db_portaltpm
     */
    constructor(props: any, context: any) {
        super(props, context,props.opts);
        
        
    }

    public render() {
        return <>
                 {this.props.children}
               </>;
    }

}


export default class {}