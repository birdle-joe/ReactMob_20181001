import { IBizViewController } from "./IBizViewController";
import { IBizEvent } from "../IBizEvent";
import { IBizNotification } from "../util/IBizNotification";

export class IBizMainViewController extends IBizViewController {

    /**
     * 是否显示工具栏，默认显示
     * 
     * @type {boolean}
     * @memberof IBizMainViewController
     */
    public $isShowToolBar: boolean = true;

    /**
     * 视图控制器标题
     * 
     * @type {string}
     * @memberof IBizMainViewController
     */
    public $caption: string = '';

    /**
     * 实体数据权限
     *
     * @type {*}
     * @memberof IBizMainViewController
     */
    public $dataaccaction: any = {};

    /**
     * Creates an instance of IBizMainViewController.
     * @param {*} props
     * @param {*} context
     * @param {*} opt
     * @memberof IBizMainViewController
     */
    constructor(props: any, context: any, opt: any) {
        super(props, context, opt);
    }

    /**
     * 视图处初始化部件
     * 
     * @memberof IBizMainViewController
     */
    public onInitComponents(): void {
        super.onInitComponents();
        const toolbar: any = this.getToolBar();
        if (toolbar) {
            toolbar.on(IBizEvent.IBizToolbar_ITEMCLICK).subscribe((params) => {
                this.onClickTBItem(params);
            });
        }
    }

    /**
     * 视图加载
     *
     * @memberof IBizMainViewController
     */
    public onLoad(): void {
        super.onLoad();
        // IBizHttp.post(this.getBackendUrl(), { 'srfaction': 'loadmodel' }).subscribe(
        //     (data) => {
        //         if (data.dataaccaction && Object.keys(data.dataaccaction).length > 0) {
        //             Object.assign(this.$dataaccaction, data.dataaccaction);
        //             this.onDataAccActionChange(data.dataaccaction);
        //         }
        //     },
        //     (error) => {
        //         console.log(error);
        //     });
    }

    /**
     * 点击按钮
     * 
     * @param {*} [params={}]  tag 事件源
     * @memberof IBizMainViewController
     */
    public onClickTBItem(params: any = {}): void {
        const uiaction = this.getUIAction(params.tag);
        this.doUIAction(uiaction, params);
    }

    /**
     * 处理实体界面行为
     * 
     * @param {*} [uiaction={}] 
     * @param {*} [params={}] 
     * @returns {void} 
     * @memberof IBizMainViewController
     */
    public doUIAction(uiaction: any = {}, params: any = {}): void {
        if (uiaction && (typeof uiaction === 'string')) {
            uiaction = this.getUIAction(uiaction);
        }
        if (uiaction) {
            if (Object.is(uiaction.type, 'DEUIACTION')) {
                this.doDEUIAction(uiaction, params);
                return;
            }
            if (Object.is(uiaction.type, 'WFUIACTION')) {
                this.doWFUIAction(uiaction, params);
                return;
            }
        }
    }

    /**
     * 获取前台行为参数
     * 
     * @param {*} [uiaction={}] 行为
     * @param {*} [params={}] 
     * @returns {*} 
     * @memberof IBizMainViewController
     */
    public getFrontUIActionParam(uiaction: any = {}, params: any = {}): any {
        let arg: any = {};
        if (uiaction.refreshview) {
            arg.callback = function (win) {
                this.refresh();
            }
        }
        return arg;
    }

    /**
     * 获取后台行为参数
     * 
     * @param {*} [uiaction={}] 行为
     * @param {*} [params={}] 
     * @returns {*} 
     * @memberof IBizMainViewController
     */
    public getBackendUIActionParam(uiaction: any = {}, params: any = {}): any { }

    /**
     * 打开界面行为视图，前端实体界面行为
     * 
     * @param {*} [uiaction={}] 行为
     * @param {*} [viewparam={}]  视图参数
     * @memberof IBizMainViewController
     */
    public openUIActionView(uiaction: any = {}, viewparam: any = {}): void {
        let frontview = uiaction.frontview;
        frontview.viewParam = viewparam;
        // 视图顶级打开
        if (Object.is(uiaction.fronttype, 'TOP')) {
            let href: string = '';
            if (!Object.is(frontview.openMode, 'INDEXVIEWTAB') && !Object.is(frontview.openMode, 'POPUPAPP')) {
                IBizNotification.warning('警告', '该视图打开方式，请选择顶级容器分页或独立程序弹出！');
                return;
            }
            // 视图非模式弹出
            href = window.location.href.substring(0, window.location.href.indexOf(window.location.hash) + 1);
            href = `${href}/data-v`;

            const _names: any[] = Object.keys(viewparam);
            let urlparams: string = '';
            _names.forEach(name => {
                urlparams += `;${name}=${viewparam[name]}`;
            });
            let url: string = `${href}/${frontview.className}${urlparams}`;
            window.open(url, '_blank');
            return;
        }

        // 视图模式打开
        let modal = false;
        if (Object.is(frontview.openMode, 'POPUPMODAL')) {
            modal = true;
        }
        if (modal) {
            this.openModal(frontview).then((result) => {
                if (result && Object.is(result.ret, 'OK')) {
                    if (result.refreshView && uiaction.reload) {
                        this.onRefresh();
                    }
                }
            });
        }
    }

    /**
     * 执行实体行为
     * 
     * @param {*} [uiaction={}] 行为
     * @param {*} [params={}] 
     * @returns {void} 
     * @memberof IBizMainViewController
     */
    public doDEUIAction(uiaction: any = {}, params: any = {}): void {
        if (Object.is(uiaction.actionmode, 'FRONT')) {
            if ((Object.is(uiaction.fronttype, 'WIZARD')) || (Object.is(uiaction.fronttype, 'SHOWPAGE')) || (Object.is(uiaction.fronttype, 'TOP'))) {
                let viewparam = this.getFrontUIActionParam(uiaction, params);
                if (!viewparam) {
                    viewparam = {};
                }
                let frontview = uiaction.frontview;
                if (frontview.redirectview) {
                    this.redirectOpenView({ redirectUrl: frontview.backendurl, viewParam: viewparam });
                    return;
                }
                // 携带所有的实体界面行为参数
                this.openUIActionView(uiaction, viewparam);
                return;
            }

            if (Object.is(uiaction.fronttype, 'OPENHTMLPAGE')) {
                let viewparam = this.getFrontUIActionParam(uiaction, params);
                let urlparams: string = '';
                const _names: any[] = Object.keys(viewparam);
                _names.forEach(name => {
                    urlparams += `&${name}=${viewparam[name]}`;
                });
                const url = `${uiaction.htmlpageurl}?${urlparams}`;
                window.open(url, '_blank');
                return;
            }
        }

        if (Object.is(uiaction.actionmode, 'BACKEND')) {
            let param = this.getBackendUIActionParam(uiaction, params);
            if (!param) {
                return;
            }
            param.srfuiactionid = uiaction.tag;
            if (uiaction.confirmmsg) {
                IBizNotification.confirm('提示', uiaction.confirmmsg).then((result) => {
                    if (result && Object.is(result, 'OK')) {
                        this.doBackendUIAction(param);
                    }
                });
            } else {
                this.doBackendUIAction(param);
            }
            return;
        }
        IBizNotification.error('错误', '未处理的实体行为[' + uiaction.tag + ']');
    }

    /**
     * 执行工作流行为
     * 
     * @param {*} [uiaction={}] 行为
     * @param {*} [params={}] 
     * @returns {void} 
     * @memberof IBizMainViewController
     */
    public doWFUIAction(uiaction: any = {}, params: any = {}): void {
        if (Object.is(uiaction.actionmode, 'WFFRONT')) {
            if (Object.is(uiaction.fronttype, 'WIZARD') || Object.is(uiaction.fronttype, 'SHOWPAGE')) {
                let className: string;
                if (uiaction.frontview.className) {
                    className = uiaction.frontview.className;
                } else {
                    className = uiaction.frontview.classname;
                }
                let opt: any = {};
                let data: any = this.getFrontUIActionParam(uiaction, params);
                opt.viewParam = {};
                if (data) {
                    Object.assign(opt.viewParam, data)
                }
                if (uiaction.frontview.viewParam) {
                    Object.assign(opt.viewParam, uiaction.frontview.viewParam);
                } else {
                    Object.assign(opt.viewParam, uiaction.frontview.viewparam);
                }
                // 打开模态框
                const modalView: any = this.getModalView(className);
                if (modalView) {
                    this.openModal(modalView, opt.viewParam).then((result) => {
                        if (result && Object.is(result.ret, 'OK')) {
                            this.onWFUIFrontWindowClosed(result);
                        }
                    });
                }
                return;
            }
        }
        IBizNotification.warning('错误', '未处理的实体工作流行为[' + uiaction.tag + ']');
    }

    /**
     * 关系工作流窗口对象
     * 
     * @param {*} win 
     * @param {*} [data={}] 
     * @memberof IBizMainViewController
     */
    public onWFUIFrontWindowClosed(win: any, data: any = {}): void { }

    /**
     * 执行后台行为
     * 
     * @param {*} [uiaction={}] 行为
     * @memberof IBizMainViewController
     */
    public doBackendUIAction(uiaction: any = {}): void {
        IBizNotification.error('错误', '未处理的后台界面行为[' + uiaction.tag + ']');
    }

    /**
     * 是否-模式框显示
     * 
     * @returns {boolean} 
     * @memberof IBizMainViewController
     */
    public isShowModal(): boolean {
        return false;
    }

    /**
     * 关闭窗口
     * 
     * @memberof IBizMainViewController
     */
    public closeView(result?: any): void {
        super.closeView(result);
    }

    /**
     * 获取标题
     * 
     * @returns {string} 标题
     * @memberof IBizMainViewController
     */
    public getCaption(): string {
        return this.$caption;
    }

    /**
     * 设置标题
     * 
     * @param {string} caption 标题
     * @memberof IBizMainViewController
     */
    public setCaption(caption: string): void {
        if (!Object.is(this.$caption, caption)) {
            this.$caption = caption;
            this.fire(IBizEvent.IBizMainViewController_CAPTIONCHANGED, this);
        }
    }

    /**
     * 获取工具栏服务对象
     * 
     * @returns {*} 
     * @memberof IBizMainViewController
     */
    public getToolBar(): any {
        return this.getControl('righttoolbar');
    }

    /**
     * 计算工具栏项状态-<例如 根据是否有选中数据,设置 工具栏按钮是否可点击>
     * 
     * @param {boolean} hasdata 是否有数据
     * @param {*} dataaccaction 
     * @memberof IBizMainViewController
     */
    public calcToolbarItemState(hasdata: boolean, dataaccaction: any): void {
        const toolbar = this.getToolBar();
        if (!toolbar) {
            return;
        }
        if (Object.keys(toolbar.getItems()).length > 0) {
            const name_arr: any[] = Object.keys(toolbar.getItems());
            const btn_items = toolbar.getItems();
            name_arr.forEach((name) => {
                const btn_item = btn_items[name];
                if (btn_item.target && (Object.is(btn_item.target, 'SINGLEKEY') || Object.is(btn_item.target, 'MULTIKEY'))) {
                    toolbar.setItemDisabled(name, !hasdata);
                }
            });

            toolbar.updateAccAction(Object.assign({}, this.$dataaccaction, dataaccaction));
        }
    }

    /**
     * 获取引用视图
     * 
     * @returns {*} 
     * @memberof IBizMainViewController
     */
    public getReferView(): any {
        return undefined;
    }

    /**
     * 打开重定向视图
     *
     * @param {*} view 打开视图的参数
     * @memberof IBizMainViewController
     */
    public redirectOpenView(view: any): void {
        let viewParam: any = {};
        viewParam.srfviewparam = JSON.stringify(view.viewParam);
        Object.assign(viewParam, { 'srfaction': 'GETRDVIEW' });
        this.$ibizHttp.post(view.redirectUrl, viewParam).then(
            response => {
                if (!response.rdview || response.ret !== 0) {
                    if (response.errorMessage) {
                        IBizNotification.info('错误', response.errorMessage);
                    }
                    return;
                }
                if (response.rdview && response.rdview.viewurl && response.ret === 0) {
                    if (response.rdview.srfkey || Object.is(response.rdview.srfkey, '')) {
                        view.viewParam.srfkey = response.rdview.srfkey;
                        view.viewParam.srfkeys = response.rdview.srfkey;
                    }
                    if (response.rdview.srfviewparam) {
                        Object.assign(view.viewParam, response.rdview.srfviewparam);
                    }

                    let routeLink: string = response.rdview.viewurl;
                    if (routeLink.lastIndexOf('.jsp') !== -1) {
                        IBizNotification.error('错误', `视图类型jsp不支持，请检查配置`);
                        return;
                    }

                    let queryParams: any = {};
                    if (view.viewParam.srfdeid && !Object.is(view.viewParam.srfdeid, '')) {
                        queryParams.srfdeid = view.viewParam.srfdeid;
                    }
                    this.openView(routeLink, view.viewParam, queryParams);
                } else {
                    IBizNotification.info('错误', '重定向视图信息获取错误,无法打开!');
                }
            },
            error => {
                IBizNotification.info('错误', error.info);
            });
    }

    /**
     * 实体数据发生变化
     *
     * @param {*} [dataaccaction={}]
     * @memberof IBizMainViewController
     */
    public onDataAccActionChange(dataaccaction: any = {}): void { }

}