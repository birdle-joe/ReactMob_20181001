import { IBizMainViewController } from '../app/IBizMainViewController';
import { IBizEvent } from 'src/ibizsys/IBizEvent';

/**
 * Portal视图控制器
 * 
 * @export
 * @class IBizPortalViewController
 * @extends {IBizMainViewController}
 */
export class IBizPortalViewController extends IBizMainViewController {
    /**
     * 应用功能集
     *
     * @private
     * @type {Map<string, any>}
     * @memberof IBizPortalViewController
     */
    private $appfuncs: Map<string, any> = new Map();

    /**
     * Creates an instance of IBizPortalViewController.
     * @param {*} props
     * @param {*} context
     * @param {*} [opts={}]
     * @memberof IBizPortalViewController
     */
    constructor(props: any, context: any, opts: any = {}) {
        super(props, context, opts);
    }

    public onInit(): void {
        super.onInit();
        this.regAppFuncs();
    }

    /**
     * 视图加载
     *
     * @memberof IBizPortalViewController
     */
    public onLoad(): void {
        this.$controls.forEach((ctrl) => {
            if (ctrl.load && typeof ctrl.load === 'function') {
                ctrl.load(this.$viewParam);
            }
        });

    }

    /**
     * 视图初始化时统一注册应用功能
     *
     * @memberof IBizPortalViewController
     */
    public regAppFuncs(): void { }

    /**
     * 注册应用功能
     *
     * @param {string} appfuncid
     * @param {*} appfunc
     * @memberof IBizPortalViewController
     */
    public regAppFunc(appfuncid: string, appfunc: any): void {
        this.$appfuncs.set(appfuncid, appfunc);
    }

    /**
     * 获取应用功能
     *
     * @param {string} appfuncid 应用功能id
     * @returns {*}
     * @memberof IBizPortalViewController
     */
    public getAppFunc(appfuncid: string): any {
        return this.$appfuncs.get(appfuncid);
    }

    public onMenuClick = (item) => {
        if(item)
        {
            this.openAppFuncView(item);
        }
    }
 
    public openAppFuncView(appfunc: any): void {
        if (appfunc) {
            if (Object.is(appfunc.functype, 'OPENHTMLPAGE')) {
                // this.openHtmlPage(appfunc.htmlPageUrl);
            } if (Object.is(appfunc.functype, 'JAVASCRIPT')) {
                // this.appFuncTypeScript(appfunc.funcid);
            } else {
                if (appfunc.codename) {
                    super.openView(appfunc.codename, appfunc.viewParams);
                }
            }
        } else {
            console.error('应用功能不存在无法打开');
        }
    }
}
