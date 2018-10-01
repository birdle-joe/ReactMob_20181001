import React from 'react';
import { Menu, Icon, Badge } from 'antd';
import { IBizControl } from "./IBizControl";
import { IBizEvent } from "../IBizEvent";
import { IBizUICounter } from 'ibizsys';
import { IBizRouter } from '../service/IBizRouterService';
import { Grid, TabBar } from 'antd-mobile';
import '../../less/IBizAppMenu.less';
/**
 * 应用菜单部件服务对象
 * 
 * @export
 * @class IBizAppMenu
 * @extends {IBizControl}
 */
export class IBizAppMenu extends IBizControl {
    /**
     * 激活组件路由信息记录对象
     *
     * @private
     * @type {IBizRouter}
     * @memberof IBizAppMenu
     */
    private $ibizroute: IBizRouter = IBizRouter.getInstance();

    /**
     * 默认选中项id组
     *
     * @private
     * @type {any[]}
     * @memberof SiderMenu
     */
    private $menuSelectedKeys: any[] = [];
    /**
     * 选中项
     *
     * @private
     * @type {*}
     * @memberof SiderMenu
     */
    private $menuSelected: any;
    /**
     * 默认打开的分组
     *
     * @private
     * @type {any[]}
     * @memberof SiderMenu
     */
    private $menuOpenKeys: any[] = [];
    /**
     * 收缩历史打开菜单
     *
     * @private
     * @type {any[]}
     * @memberof IBizAppMenu
     */
    private $oldMenuOpenKeys: any[] = [];
    /**
     * 计数器
     *
     * @private
     * @type {IBizUICounter}
     * @memberof SiderMenu
     */
    private $uiCounter: IBizUICounter;

    /**
     * 菜单数据项
     * 
     * @type {any[]}
     * @memberof IBizAppMenuControl
     */
    public $items: any[] = [];

    /**
     * 应用功能map表
     *
     * @private
     * @type {Map<string, any>}
     * @memberof IBizAppMenu
     */
    private $appfunctions: Map<string, any> = new Map();

    /**
     * Creates an instance of IBizAppMenu.
     * @param {*} props
     * @param {*} context
     * @memberof IBizAppMenu
     */
    constructor(props: any, context: any, opts: any = {}) {
        super(props, context, opts);
        this.state = {
            counterData: undefined
        };
        if (props.uicounter) {
            this.$uiCounter = props.uicounter;
            this.$uiCounter.onCounterChange().subscribe((data) => {
                this.setState({
                    counterData: data
                });
            });
        }
        this.regAppfuncs();
    }

    public componentWillReceiveProps(nextProps): void {
        const { match, location, collapsed } = nextProps;
        if (Object.is(match.url, location.pathname)) {
            this.calculation(match.url)
        }
        if (collapsed) {
            this.$oldMenuOpenKeys = this.$menuOpenKeys;
            this.$menuOpenKeys = [];
        } else {
            this.$menuOpenKeys = this.$oldMenuOpenKeys;
        }
    }

    /**
     * 注册应用功能集, 在发布的部件中重写
     *
     * @memberof IBizAppMenu
     */
    protected regAppfuncs(): void { }

    /**
     * 注册应用功能
     *
     * @protected
     * @param {string} appfuncid
     * @param {*} appfunc
     * @memberof IBizAppMenu
     */
    protected regAppfunc(appfuncid: string, appfunc: any): void {
        this.$appfunctions.set(appfuncid, appfunc);
    }

    /**
     * 根据id获取应用功能
     *
     * @param {string} appfuncid
     * @returns {*}
     * @memberof IBizAppMenu
     */
    public getAppFunc(appfuncid: string): any {
        return this.$appfunctions.get(appfuncid);
    }

    /**
     * 部件加载
     * 
     * @memberof IBizAppMenuControl
     */
    public load(): Promise<any> {
        return new Promise((resolve) => {
            const params: any = { srfctrlid: this.getName(), srfaction: 'fetch' };
            this.post(params).subscribe(success => {
                if (success && success.ret === 0) {
                    this.$items = success.items;
                    const { location } = this.props;
                    if (!this.calculation(location.pathname)) {
                        this.routeDefaultSelect();
                    }
                    this.tick();
                    resolve(success.items);
                }
            }, error => {
                console.error('首页菜单加载错误', error);
            });
        });
    }

    /**
     * 应用第一次加载，计算默认展开路由节点
     *
     * @private
     * @returns {boolean} 计算是否成功
     * @memberof IBizAppMenu
     */
    private calculation(path): boolean {
        const { match } = this.props;
        // 第一次来计算默认路由Start
        if (match && !Object.is(path, match.url)) {
            return false;
        }
        if (true) {
            let isOpendefault: boolean = false;
            this.$items.some((item) => {
                this.$menuOpenKeys = [];
                if (item.leaf) {
                    if (item.opendefault) {
                        this.$menuSelected = item;
                        isOpendefault = true;
                        return true;
                    }
                } else {
                    this.$menuOpenKeys.push(item.id);
                    isOpendefault = this.defaultSelect(item.items);
                }
                return false;
            });
            if (!isOpendefault) {
                this.$menuOpenKeys = [''];
                this.$menuSelectedKeys = [''];
            } else {
                this.$oldMenuOpenKeys = this.$menuOpenKeys;
                this.$menuSelectedKeys = [this.$menuSelected.appfuncid];
                // this.menuClick({ key: this.$menuSelected.appfuncid});
            }
        }
        // 计算默认路由End
        return true;
    }

    /**
     * 计算默认展开
     *
     * @private
     * @param {any[]} items
     * @memberof SiderMenu
     */
    private defaultSelect(items: any[]): boolean {
        let is = false;
        if (items) {
            items.some((item) => {
                if (item.leaf) {
                    if (item.opendefault) {
                        this.$menuSelected = item;
                        is = true;
                        return true;
                    }
                } else {
                    this.$menuOpenKeys.push(item.id);
                    is = this.defaultSelect(item.items);
                }
                return false
            });
        }
        return is;
    }

    /**
     * 计算非首页进入，路由展开节点
     *
     * @private
     * @memberof IBizAppMenu
     */
    private routeDefaultSelect(): void {
        const { collapsed } = this.props;
        if (collapsed) {
            return;
        }
        const activateRouteData = this.$ibizroute.getActivateRouteData();
        if (activateRouteData.length > 1) {
            const activate = activateRouteData[1];
            let selectUrl: string = activate.url;
            selectUrl = selectUrl.substring(0, selectUrl.lastIndexOf('/'));
            selectUrl = selectUrl.substring(selectUrl.lastIndexOf('/') + 1, selectUrl.length);
            this.$appfunctions.forEach((item) => {
                if (Object.is(selectUrl, item.codename)) {
                    const funcid: string = item.funcid;
                    this.$menuSelectedKeys = [funcid.toUpperCase()];
                    let isFindOpenNode: boolean = false;
                    this.$items.some((nodeItem) => {
                        this.$menuOpenKeys = [];
                        if (nodeItem.items) {
                            this.$menuOpenKeys.push(nodeItem.id);
                            isFindOpenNode = this.routeCheckDefaultOpen(nodeItem.items, funcid.toUpperCase());
                        }
                        if (isFindOpenNode) {
                            return true;
                        }
                        return false;
                    });
                    if (!isFindOpenNode) {
                        this.$menuOpenKeys = [];
                    } else {
                        this.$oldMenuOpenKeys = this.$menuOpenKeys;
                    }
                }
            });
            this.tick();
        } else {
            setTimeout(() => {
                this.routeDefaultSelect();
            }, 50);
        }
    }

    /**
     * 计算默认展开
     *
     * @private
     * @param {any[]} items
     * @memberof SiderMenu
     */
    private routeCheckDefaultOpen(items: any[], appfuncid: string): boolean {
        let is = false;
        if (items) {
            items.some((item) => {
                if (item.leaf) {
                    if (Object.is(item.appfuncid, appfuncid)) {
                        is = true;
                        return true;
                    }
                }
                is = this.routeCheckDefaultOpen(item.items, appfuncid);
                if (is) {
                    this.$menuOpenKeys.push(item.id);
                }
                return is;
            });
        }
        return is;
    }

    /**
     * 菜单选中
     * 
     * @param {*} select 
     * @returns {*} 
     * @memberof IBizAppMenuControl
     */
    public onSelectChange(select: any): any {
        this.fire(IBizEvent.IBizAppMenu_MENUSELECTION, select);
    }

    /**
     * 菜单打开回调
     *
     * @memberof IBizAppMenu
     */
    public onOpenChange = (openKeys: string[]) => {
        this.$menuOpenKeys = openKeys;
        this.$oldMenuOpenKeys = openKeys;
        this.tick();
    }

    /**
     * 菜单选中回调
     *
     * @memberof IBizAppMenu
     */
    public onSelect = ({ selectedKeys }) => {
        this.$menuSelectedKeys = selectedKeys;
        this.tick();
    }

    /**
     * 获取图标
     *
     * @param {*} icon
     * @returns
     * @memberof SiderMenu
     */
    public getIcon(icon: any) {
        if (typeof icon === 'string' && (icon.indexOf('http') === 0 || icon.indexOf('https') === 0)) {
            return <Icon type=""><img src={icon} alt='icon' className={`icon sider-menu-item-img`} /></Icon>;
        }
        if (typeof icon === 'string') {
            return <Icon type=""><i className={icon} /></Icon>;
        }
        return icon;
    }

    /**
     * 绘制菜单项
     *
     * @param {any[]} items
     * @param {number} [level=0]
     * @returns
     * @memberof IBizAppMenu
     */
    public renderMenus(items: any[], level: number = 0) {

        let menus;
        const { counterData } = this.state;
        if (items && Array.isArray(items) && (items.length > 0)) {
            menus = items.map((item) => {
                if (item.leaf && Object.is(item.text, '')) {
                    return <Menu.Divider key={item.id} />
                }
                let icon;
                if (!Object.is(item.icon, '')) {
                    icon = this.getIcon(item.icon);
                } else if (!Object.is(item.iconcls, '')) {
                    icon = this.getIcon(item.iconcls);
                } else if (level === 0) {
                    icon = <Icon className="ibiz-app-menu-icon" type="paper-clip" />;
                }
                let counter;
                if (counterData && !Object.is(item.counterid, '')) {
                    counter = <Badge className="ibiz-app-menu-badge" offset={[3, -3]} count={counterData[item.counterid]} />
                }
                if (item.leaf) {
                    return (<Menu.Item disabled={item.appfuncid ? false : true} className="ibiz-app-menu-item" key={item.appfuncid ? item.appfuncid : item.id}>
                        {icon}
                        <span>{item.text}</span>
                        {counter}
                    </Menu.Item>)
                } else {
                    return (<Menu.SubMenu className="ibiz-app-sub-menu" key={item.id} title={<span>{icon}<span>{item.text}</span>{counter}</span>}>
                        {this.renderMenus(item.items, level + 1)}
                    </Menu.SubMenu>)
                }
            });
        }
        return menus;
    }

    /**
     * 菜单绘制
     *
     * @returns
     * @memberof IBizAppMenu
     */
    public render() {
        let child;
        const menuType = this.props.type;
        if (menuType === 'navmenu') {

           return   <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
             
           <TabBar unselectedTintColor="#949494" tintColor="#33A3F4" barTintColor="white" >
               {
                   child = this.$items.map(((item, index) => {
                       return <TabBar.Item title={item.text} key={item.appfuncid} icon={<i className="fa fa-home fa-fw fa-lg"></i>} selectedIcon={<i className="fa fa-home fa-fw fa-lg"></i>} selected={this.selectedTab === item.appfuncid} onPress={this.onTabChange.bind(this, item)} style={{backgroundColor:'#e8e9e9'}}>
                          {this.props.children}
                       </TabBar.Item>;
                   }))
               }
           </TabBar>
       </div>
           ;
        }
        else {
            return <Grid data={this.$items} columnNum={4} onClick={this.menuClick.bind(this, event)}  className="grid"/>
        }

    }

    public menuClick = (param, event: any) => {
        const { menuClick } = this.props;
    
        let key = event.appfuncid;

        if (key) {
            const appFunc = this.getAppFunc(key);
            if (key) {
                if (menuClick) {
                    menuClick(appFunc);
                }
            }
        }
    
    }

    public onTabChange = (item) => {
        const { menuClick } = this.props;
        if (item) {
           let appfuncid=item.appfuncid;
           let select=item.appfuncid;
            if(select){
                this.selectedTab=select;
                this.tick();
            }
            const appFunc = this.getAppFunc(appfuncid);
            if (appfuncid) {
                if (menuClick) {
                    menuClick(appFunc);
                }

            }
        }
    }

    protected selectedTab: string;

}
