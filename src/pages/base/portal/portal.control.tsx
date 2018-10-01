
import { IBizPortlet} from 'ibizsys';
import React from 'react';
import { IBizAppMenu } from 'ibizsys';

/**
 * 应用菜单部件服务对象
 * 
 * @export
 * @class Db_portal_appmenu
 * @extends { IBizAppMenu }
 */
export class Db_portal_appmenu extends IBizAppMenu {

    /**
     * Creates an instance of Db_portal_appmenu.
     * 创建 Db_portal_appmenu实例
     * 
     * @param {*} props
     * @param {*} context
     * @memberof Db_portal_appmenu
     */
    constructor(props: any, context: any) {
        super(props, context,props.opts);
    }

    public regAppfuncs(): void {
    }

}

/**
 * 门户部件
 * 
 * @export
 * @class Db_portal
 * @extends { IBizPortlet }
 */
export class Db_portal extends IBizPortlet {

    /**
     * Creates an instance of Db_portal.
     * 创建 Db_portal实例
     * 
     * @param {*} props
     * @param {*} context
     * @memberof Db_portal
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