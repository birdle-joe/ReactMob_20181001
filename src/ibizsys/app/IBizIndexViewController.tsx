import { IBizMainViewController } from "./IBizMainViewController";
import { asyncComponent } from "ibizsys";
import { IBizEvent } from "../IBizEvent";
// import Exception from 'ant-design-pro/lib/Exception';

export class IBizIndexViewController extends IBizMainViewController {
    /**
     * 当前选中的菜单
     *
     * @protected
     * @type {string} 
     * @memberof IBizIndexViewController
     */
    protected selectedTab: string;

      
    private activated: Map<string, any> = new Map();
    

    /**
     * Creates an instance of IBizIndexViewController.
     * @param {*} props
     * @param {*} context
     * @param {*} opt
     * @memberof IBizIndexViewController
     */
    constructor(props: any, context: any, opt: any) {
        super(props, context, opt);       
    }
    
    /**
     * 切换菜单
     *
     * @memberof IBizIndexViewController
     */
    public onTabChange = (tab: string) => {
        this.selectedTab = tab;
        this.tick();
    }

 
    protected loadAsyncComponent(name: string, asyncCom) {
        let com = this.activated.get(name);
        if (!com) {
            com = asyncComponent(() => asyncCom);
            this.activated.set(name, com);
        }
        return com;
    }
  
    public onLoad(): void {
        super.onLoad();
        const appMenu = this.getAppMenu();
        if (appMenu) {
            appMenu.load();
        }
    }


    public getAppMenu(): any {
        return this.getControl('appmenu');
    }


    public onInitComponents(): void {
        super.onInitComponents();
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

    protected render404 = (props) => {
        // return <Exception type="404"/>;
    }


    public onMenuClick = (item) => {
        if(item)
        {
            this.openAppFuncView(item);
        }
    }
}