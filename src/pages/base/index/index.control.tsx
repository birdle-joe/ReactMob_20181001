
import { IBizAppMenu } from 'ibizsys';

/**
 * 应用菜单部件服务对象
 * 
 * @export
 * @class AppMenu
 * @extends { IBizAppMenu }
 */
export class AppMenu extends IBizAppMenu {

    /**
     * Creates an instance of AppMenu.
     * 创建 AppMenu实例
     * 
     * @param {*} props
     * @param {*} context
     * @memberof AppMenu
     */
    constructor(props: any, context: any) {
        super(props, context,props.opts);
    }

    public regAppfuncs(): void {
        this.regAppfunc('3FCDBE66-5FF1-4FB5-82EF-94971D621C2C', {funcid: '3fcdbe66-5ff1-4fb5-82ef-94971d621c2c', codename: 'wechat_weclasstaskmobcalendarview', functype: 'APPVIEW', openmode: 'INDEXVIEWTAB', viewParams: {}});
        this.regAppfunc('7DB9F47D-579F-419E-8EB2-036AA51BF26B', {funcid: '7db9f47d-579f-419e-8eb2-036aa51bf26b', codename: 'base_portal', functype: 'APPVIEW', openmode: 'INDEXVIEWTAB', viewParams: {}});
        this.regAppfunc('EC4BA24C-1E3A-432D-A21F-31734468DEFE', {funcid: 'ec4ba24c-1e3a-432d-a21f-31734468defe', codename: 'base_portaltpm', functype: 'APPVIEW', openmode: 'INDEXVIEWTAB', viewParams: {}});
    }

}

export default class {}