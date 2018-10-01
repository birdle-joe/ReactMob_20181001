import { IBizObject } from '../IBizObject';
import { IBizUICounter } from '../util/IBizUICounter';
import { IBizCodeList } from '../util/IBizCodeList';
import { IBizEvent } from '../IBizEvent';
import { IBizModal } from '../components/ibiz-modal/ibiz-modal';
import { ModalProps } from 'antd/lib/modal';

export class IBizViewController extends IBizObject {

    /**
     * 视图控制器父对象数据
     * 
     * @type {*}implements OnInit, OnDestroy, OnChanges
     * @memberof IBizViewController
     */
    public $parentData: any = {};

    /**
     * 视图控制器父对象模型
     * 
     * @type {*}
     * @memberof IBizViewController
     */
    public $parentMode: any = {};

    /**
     * 视图控制器是否初始化
     * 
     * @type {boolean}
     * @memberof IBizViewController
     */
    public $isInitEnd: boolean;

    /**
     * 视图控制器代码表
     * 
     * @type {*}
     * @memberof IBizViewController
     */
    public $codeLists: Map<string, IBizCodeList> = new Map();

    /**
     * 视图部件控制器
     * 
     * @type {*}
     * @memberof IBizViewController
     */
    public $controls: Map<string, any> = new Map();

    /**
     * 视图控制器实体界面行为
     * 
     * @type {*}
     * @memberof IBizViewController
     */
    public $uiActions: Map<string, any> = new Map();

    /**
     * 视图控制器计数器
     * 
     * @type {*}
     * @memberof IBizViewController
     */
    public $uiCounters: Map<string, IBizUICounter> = new Map();

    /**
     * 视图控制器url
     *
     * @private
     * @type {string}
     * @memberof IBizViewController
     */
    private $url: string;

    /**
     * 视图控制器参数
     * 
     * @type {*}
     * @memberof IBizViewController
     */
    public $viewParam: any = {};

    /**
     * 路由对象
     *
     * @memberof IBizViewController
     */
    public $history;

    /**
     * 当前路由节点信息
     *
     * @memberof IBizViewController
     */
    public $match;

    /**
     * 模态框控制器
     *
     * @type {IBizModal}
     * @memberof IBizViewController
     */
    public $modalCtrl: IBizModal = IBizModal.getInstance();

    /**
     * 可模态框打开的视图
     *
     * @private
     * @type {Map<string, () => any>}
     * @memberof IBizViewController
     */
    private $modalComponent: Map<string, () => any> = new Map();

    /**
     * 视图控制器标识
     * 
     * @private
     * @type {string}
     * @memberof IBizViewController
     */
    private $uuid: string = this.createUUID();

    /**
     * 激活路由守卫数据
     * 
     * @type {*}
     * @memberof IBizViewController
     */
    public $activatedRouteData: any = {};

    /**
     * Creates an instance of IBizViewController.
     * @param {*} props
     * @param {*} context
     * @param {*} [opts={}]
     * @memberof IBizViewController
     */
    constructor(props: any, context: any, opts: any = {}) {
        super(props, context, opts);
        // 路由操作对象
        this.$history = props.history;
        // 当前视图路由信息
        this.$match = props.match;
        // 当前视图请求地址
        this.$url = opts.url;
        // 注册模态视图
        this.regModalViews();
        // 注册代码表
        this.regCodeLists();
        // 注册计数器
        this.regUICounters();
        // 获取视图参数
        this.parseViewParams();
    }

    // React生命周期start
    /**
     * 在渲染之前调用
     *
     * @memberof IBizViewController
     */
    // public componentWillMount() { }

    /**
     * 在第一次渲染后调用
     *
     * @memberof IBizViewController
     */
    public componentDidMount() {
        this.onInit();
        this.onInitEnd();
    }

    /**
     * 在组件接收到一个新的 prop (或更新后)时被调用
     *
     * @memberof IBizViewController
     */
    public componentWillReceiveProps(nextProps: Readonly<any>, nextContext: any) {
        this.viewRouteChange(nextProps);
    }

    /**
     * 返回一个布尔值。在组件接收到新的props或者state时被调用。在初始化时或者使用forceUpdate时不被调用
     *
     * @param {Readonly<any>} nextProps
     * @param {Readonly<any>} nextState
     * @param {*} nextContext
     * @returns {boolean}
     * @memberof IBizViewController
     */
    // public shouldComponentUpdate(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): boolean {
    //     return true;
    // }

    /**
     * 在组件接收到新的props或者state但还没有render时被调用。在初始化时不会被调用
     *
     * @memberof IBizViewController
     */
    // public componentWillUpdate(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any) { }

    /**
     * 在组件完成更新后立即调用。在初始化时不会被调用
     *
     * @memberof IBizViewController
     */
    // public componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any) { }

    /**
     * 在组件从 DOM 中移除的时候立刻被调用
     *
     * @memberof IBizViewController
     */
    public componentWillUnmount() {
        this.onDestroy();
    }
    // React生命周期End

    /**
     * 视图组件销毁时调用
     * 
     * @memberof IBizViewController
     */
    public onDestroy(): void {
        this.unRegUICounters();
        this.$iBizApp.popViewController();
    }

    /**
     * 视图控制器全局唯一标示
     * 
     * @private
     * @returns {string} 
     * @memberof IBizViewController
     */
    private createUUID(): string {
        const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    /**
     * 获取UUID
     * 
     * @returns {string} 
     * @memberof IBizViewController
     */
    public getUUID(): string {
        return this.$uuid;
    }

    /**
     * 视图路由发生变化，重新初始化视图
     * 
     * @param {*} nextProps 
     * @memberof IBizViewController
     */
    public viewRouteChange(nextProps: any) {
        const { match } = nextProps;
        if (match && this.$match) {
            if (!Object.is(match.url, this.$match.url)) {
                this.$match = match;
                this.$viewParam = [];
                this.parseViewParams();
                this.onLoad();
                this.fire(IBizEvent.IBizViewController_INITED, this);
            }
        }
    }

    /**
     * 视图初始化
     * 
     * @memberof IBizViewController
     */
    public onInit(): void {
        this.regControls();
        this.regUIActions();
        this.onInitComponents();
        this.onLoad();
        this.fire(IBizEvent.IBizViewController_INITED, this);
    }

    /**
     * 部件初始化
     * 
     * @memberof IBizViewController
     */
    public onInitComponents(): void { }

    /**
     * 
     * 数据加载
     * @memberof IBizViewController
     */
    public onLoad(): void { }


    /**
     * 视图控制器初始化完成
     * 
     * @memberof IBizViewController
     */
    public onInitEnd(): void {
        this.$isInitEnd = true;
        this.$iBizApp.setViewController(this);
    }

    /**
     * 开始触发界面行为
     * 
     * @param {any} id 
     * @memberof IBizViewController
     */
    public clickButton(id): void {
        this.onClickTBItem({ tag: id });
    }

    /**
     * 
     * 
     * @param {any} params 
     * @memberof IBizViewController
     */
    public onClickTBItem(params): void { }

    /**
     * 根据ref注册所有部件控制器
     *
     * @protected
     * @memberof IBizViewController
     */
    protected regControls(): void {
        if (this.refs) {
            for (const name in this.refs) {
                if (this.refs.hasOwnProperty(name)) {
                    const element = this.refs[name];
                    this.regControl(name, element);
                }
            }
        }
    }

    /**
     * 注册部件控制器
     * 
     * @param {string} name 
     * @param {*} control 
     * @memberof IBizViewController
     */
    public regControl(name: string, control: any): void {
        this.$controls.set(name, control);
    }

    /**
     * 获取部件控制器
     * 
     * @param {string} name 
     * @returns {*} 
     * @memberof IBizViewController
     */
    public getControl(name: string): any {
        if (this.$controls.has(name)) {
            return this.$controls.get(name);
        }
        return undefined;
    }

    /**
     * 注册模态视图
     *
     * @memberof IBizViewController
     */
    public regModalViews(): void {
        return;
    }

    /**
     * 注册模态框视图
     *
     * @memberof IBizViewController
     */
    public regModalView(key: string, asyncImport: () => any) {
        if (key && !Object.is(key, '')) {
            this.$modalComponent.set(key, asyncImport);
        }
    }

    /**
     * 获取模态框视图
     *
     * @param {string} key
     * @returns {*} 组件异步加载对象
     * @memberof IBizViewController
     */
    public getModalView(key: string): any {
        return this.$modalComponent.get(key);
    }

    /**
     * 
     * 
     * @returns {*} 
     * @memberof IBizViewController
     */
    public unloaded(): any {
        return null;
    }

    /**
     * 是否初始化完毕
     * 
     * @returns {boolean} 
     * @memberof IBizViewController
     */
    public isInitEnd(): boolean {
        return this.$isInitEnd;
    }

    /**
     * 
     * 
     * @returns {string} 
     * @memberof IBizViewController
     */
    public getAppCtx(): string {
        return '';
    }

    /**
     * 获取父控件
     * 
     * @returns {*} 
     * @memberof IBizViewController
     */
    public getPController(): any {
        return this.$iBizApp.getParentViewController(this.getUUID());
    }

    /**
     * 注册代码表
     * 
     * @param {*} codeList 
     * @memberof IBizViewController
     */
    public regCodeList(codeList: any): void {
        this.$codeLists.set(codeList.getId(), codeList);
    }

    /**
     * 获取代码表
     * 
     * @param {string} codelistId 
     * @returns {*} 
     * @memberof IBizViewController
     */
    public getCodeList(codelistId: string): IBizCodeList | undefined {
        return this.$codeLists.get(codelistId);
    }

    /**
     * 注册界面行为
     * 
     * @param {*} [uiAction={}] 
     * @memberof IBizViewController
     */
    public regUIAction(uiAction: any = {}): void {
        if (uiAction) {
            this.$uiActions.set(uiAction.tag, uiAction);
        }
    }

    /**
     * 获取界面行为
     * 
     * @param {string} uiActionId 
     * @returns {*} 
     * @memberof IBizViewController
     */
    public getUIAction(uiActionId: string): any {
        return this.$uiActions.get(uiActionId);
    }

    /**
     * 注册界面计数器
     * 
     * @param {string} name 
     * @param {*} uiCounter 
     * @memberof IBizViewController
     */
    public regUICounter(name: string, uiCounter: any): void {
        this.$uiCounters.set(name, uiCounter);
    }

    /**
     * 获取界面计数器
     * 
     * @param {string} name 
     * @returns {*} 
     * @memberof IBizViewController
     */
    public getUICounter(name: string): any {
        return this.$uiCounters.get(name);
    }

    /**
     * 刷新全部界面计数器
     * 
     * @memberof IBizViewController
     */
    public reloadUICounters(): void {
        this.$uiCounters.forEach((uicounter: IBizUICounter) => {
            uicounter.reload();
        });
        const pController = this.getPController();
        if (pController) {
            pController.reloadUICounters();
        }
    }

    /**
     * 是否支持视图模型
     * 
     * @returns {boolean} 
     * @memberof IBizViewController
     */
    public isEnableViewModel(): boolean {
        return false;
    }

    /**
     * 获取后台地址
     * 
     * @returns {string} 
     * @memberof IBizViewController
     */
    public getBackendUrl(): string {
        if (this.$url) {
            return this.$url;
        }
        return '';
    }

    /**
     * 销毁 
     * 
     * @memberof IBizViewController
     */
    public destroy(): void { }

    /**
     * 刷新
     * 
     * @memberof IBizViewController
     */
    public refresh(): void {
        this.onRefresh();
    }

    /**
     * 视图刷新方法，继承视图控制器重写
     * 
     * @memberof IBizViewController
     */
    protected onRefresh(): void { }

    /**
     * 设置父数据
     * 
     * @param {*} [data={}] 
     * @memberof IBizViewController
     */
    public setParentData(data: any = {}): void {
        this.$parentData = {};
        Object.assign(this.$parentData, data);
        this.onSetParentData();
        this.reloadUpdatePanels();
    }

    /**
     * 设置父数据
     * 
     * @memberof IBizViewController
     */
    public onSetParentData(): void { }

    /**
     * 获取父数据
     * 
     * @returns {*} 
     * @memberof IBizViewController
     */
    public getParentData(): any {
        return this.$parentData;
    }

    /**
     * 获取父模式
     * 
     * @returns {*} 
     * @memberof IBizViewController
     */
    public getParentMode(): any {
        return this.$parentMode;
    }

    /**
     * 获取引用数据
     * 
     * @returns {*} 
     * @memberof IBizViewController
     */
    public getReferData(): any {
        return undefined;
    }

    /**
     * 获取引用数据
     * 
     * @returns {*} 
     * @memberof IBizViewController
     */
    public getViewParam(): any {
        return this.$viewParam;
    }

    /**
     * 正常代码表模式
     * 
     * @param {string} codeListId 代码表ID
     * @param {string} value 数据值
     * @param {string} emtpytext 空值显示数据
     * @returns {string} 
     * @memberof IBizViewController
     */
    public renderCodeList_Normal(codeListId: string, value: string, emtpytext: string): string {
        if (!value) {
            return emtpytext;
        }
        const codeList = this.getCodeList(codeListId);
        if (codeList) {
            let result = '';
            const values = value.split(';');
            values.forEach((val) => {
                const item = codeList.getItemByValue(val);
                if (item) {
                    result += '、' + item.text;
                }
            });
            if (result.length > 1) {
                result = result.substring(1);
            }
            return result;
        }
        return '';
    }

    /**
     * 代码表数字或处理
     * 
     * @param {string} codeListId 代码表ID
     * @param {string} value 数据值
     * @param {string} emtpytext 空值显示信息
     * @param {string} textSeparator 文本拼接方式
     * @returns {string} 
     * @memberof IBizViewController
     */
    public renderCodeList_NumOr(codeListId: string, value: string, emtpytext: string, textSeparator: string): string {
        if (!textSeparator || Object.is(textSeparator, '')) {
            textSeparator = '、';
        }
        let strTextOr = '';
        if (!value) {
            return emtpytext;
        }
        const nValue = parseInt(value, 10);
        const codelist = this.getCodeList(codeListId);
        if (codelist) {
            codelist.$data.forEach(ele => {
                const codevalue = ele.value;
                if ((parseInt(codevalue, 10) & nValue) > 0) {
                    if (strTextOr.length > 0) {
                        strTextOr += (textSeparator);
                    }
                    strTextOr += codelist.getCodeItemText(ele);
                }
            });
        }
        return strTextOr;
    }

    /**
     * 代码表文本或处理
     * 
     * @param {string} codeListId 代码表ID
     * @param {*} value 数据值
     * @param {*} emtpytext 空值显示信息
     * @param {*} textSeparator 文本凭借方式
     * @param {*} valueSeparator 数据值分割方式
     * @returns {string} 
     * @memberof IBizViewController
     */
    public renderCodeList_StrOr(codeListId: string, value: any, emtpytext: any, textSeparator: any, valueSeparator: any): string {
        if (!textSeparator || Object.is(textSeparator, '')) {
            textSeparator = '、';
        }
        if (!value) {
            return emtpytext;
        }
        let strTextOr = '';
        const arrayValue: any[] = value.split(valueSeparator);
        arrayValue.forEach((val) => {
            let strText = '';
            strText = this.renderCodeList_Normal(codeListId, val, emtpytext);
            if (strTextOr.length > 0) {
                strTextOr += (textSeparator);
            }
            strTextOr += strText;
        });
        return strTextOr;
    }

    /**
     * 
     * 
     * @param {any} ctrlId 
     * @param {any} command 
     * @param {any} arg 
     * @memberof IBizViewController
     */
    public invokeCtrl(ctrlId, command, arg): void { }

    /**
     * 注册界面更新面板
     * 
     * @param {*} updatePanel 
     * @memberof IBizViewController
     */
    public regUpdatePanel(updatePanel: any): void { }

    /**
     * 获取界面更新面板
     * 
     * @param {string} updatePanelId 
     * @returns {*} 
     * @memberof IBizViewController
     */
    public getUpdatePanel(updatePanelId: string): any {
        return undefined;
    }

    /**
     * 刷新全部界面更新面板
     * 
     * @memberof IBizViewController
     */
    public reloadUpdatePanels(): void { }

    /**
     * 填充更新面板调用参数
     * 
     * @param {*} [params={}] 
     * @memberof IBizViewController
     */
    public onFillUpdatePanelParam(params: any = {}): void { }

    // 附加方法

    /**
     * 初始化注册界面行为
     * 
     * @memberof IBizViewController
     */
    public regUIActions(): void { }

    /**
     * 初始化注册计数器
     * 
     * @memberof IBizViewController
     */
    public regUICounters(): void { }

    /**
     * 销毁计数器
     *
     * @memberof IBizViewController
     */
    public unRegUICounters(): void {
        this.$uiCounters.forEach((counter: IBizUICounter) => {
            counter.close();
        });
    }
    /**
     * 初始化代码表
     * 
     * @memberof IBizViewController
     */
    public regCodeLists(): void { }

    /**
     * 解析url参数，初始化调用
     * 
     * @protected
     * @memberof IBizViewController
     */
    protected parseViewParams(): void {
        if (this.props.modalParam) {
            this.addViewParam(this.props.modalParam);
        }
        if (this.$history) {
            const loca = this.$history.location;
            if (loca && loca.query) {
                this.addViewParam(loca.query);
            }
        }
        if (this.$match) {
            let params = this.$match.params.params;
            if (params) {
                try {
                    params = decodeURIComponent(params);
                    this.addViewParam(JSON.parse(params));
                } catch (error) {
                    console.error('路由参数转换失败:', error, this);
                }
            }
        }
    }

    /**
     * 添加视图参数, 处理视图刷新操作
     *
     * @param {*} [param={}]
     * @memberof IBizViewController
     */
    public addViewParam(param: any = {}): void {
        Object.assign(this.$viewParam, param);
    }

    /**
     * 以模态框形式打开视图
     *
     * @param {() => any} asyncImport 异步组件方法,例:() => import('@pages/base-test/notice2-edit-view/notice2-edit-view');
     * @param {*} [params] 向组件传递的参数
     * @param {*} [config] 模态框配置
     * @returns {*}
     * @memberof IBizViewController
     */
    public openModal(asyncImport: () => any, params?: any, config?: ModalProps): Promise<any> {
        return new Promise((resolve) => {
            this.$modalCtrl.openModal(asyncImport, params, config).subscribe((res) => {
                if (res && Object.is(res.ret, 'OK')) {
                    this.onLoad();
                    resolve(res);
                }
                if (res && Object.is(res.ret, 'CANCEL')) {
                    resolve(res);
                }
            });
        });
    }

    /**
     * 打开数据视图;打开方式,路由打开
     * 
     * @param {string} routeString 相对路由地址
     * @param {*} [routeParam={}] 激活路由参数
     * @param {*} [queryParams] 路由全局查询参数
     * @memberof IBizViewController
     */
    public openView(routeString: string, routeParam: any = {}, queryParams: any = {}): void {
        const path = {
            pathname: `${this.$match.url}/${routeString}/${encodeURIComponent(JSON.stringify(routeParam))}`,
            query: queryParams
        }
        this.routePush(path);
    }

    /**
     * 设置路由
     *
     * @param {*} path
     * @memberof IBizViewController
     */
    public routePush(path): void {
        this.$history.push(path);
    }

    /**
     * 关闭视图
     *
     * @param {*} [data={}]
     * @returns {void}
     * @memberof IBizViewController
     */
    public closeView(data: any = {}): void {
        const result = { data: { ...data } };
        Object.assign(result, { ret: 'OK' });
        if (this.props.modalClose && this.props.modalClose instanceof Function) {
            this.props.modalClose(result);
            return;
        }
        this.goBack();
    }

    /**
     * 无返回关闭视图
     *
     * @param {*} [data={}]
     * @returns {void}
     * @memberof IBizViewController
     */
    public backView(): void {
        if (this.props.modalClose && this.props.modalClose instanceof Function) {
            this.props.modalClose({ ret: 'CANCEL' });
            return;
        }
        this.goBack();
    }

    /**
     * 视图是否是模态框对象
     *
     * @returns {boolean}
     * @memberof IBizViewController
     */
    public isModal(): boolean {
        if (this.props.modalClose) {
            return true;
        }
        return false;
    }

    /**
     * 获取实体名称
     * 
     * @returns {string} 
     * @memberof IBizViewController
     */
    public getDEName(): string {
        return '';
    }

    /**
     * 返回历史记录
     * 
     * @memberof IBizViewController
     */
    public goBack(): void {
        if (this.$history) {
            this.$history.goBack();
        }
    }

}