import { IBizMainViewController } from './IBizMainViewController';
import { IBizEvent } from '../IBizEvent';
// import { IBizNotification } from '../util/IBizNotification';

/**
 * 多项数据视图控制器
 * 
 * @export
 * @class IBizMDViewController
 * @extends {IBizMainViewController}
 */
export class IBizMDViewController extends IBizMainViewController {

    /**
     * 当前数据主键
     * 
     * @type {string}
     * @memberof IBizMDViewController
     */
    public $currentDataKey: string | undefined = '';

    /**
     * 是否支持多选
     * 
     * @type {boolean}
     * @memberof IBizMDViewController
     */
    public $multiSelect: boolean = false;

    /**
     * 快速搜索值
     * 
     * @type {string}
     * @memberof IBizMDViewController
     */
    public $searchValue: string;

    /**
     * 父数据改变
     * 
     * @type {boolean}
     * @memberof IBizMDViewController
     */
    public $parentDataChanged: boolean = false;

    /**
     * 表格是否支持行编辑
     * 
     * @type {boolean}
     * @memberof IBizMDViewController
     */
    public $isInGridRowEdit: boolean = false;

    /**
     * 实体支持快速搜索属性
     * 
     * @type {any[]}
     * @memberof IBizMDViewController
     */
    public $quickSearchEntityDEFields: any[] = [];

    /**
     * 快速搜索提示信息
     * 
     * @type {string}
     * @memberof IBizMDViewController
     */
    public $quickSearchTipInfo: string = '';

    /**
     * Creates an instance of IBizMDViewController.
     * @param {*} props
     * @param {*} context
     * @param {*} [opts={}]
     * @memberof IBizMDViewController
     */
    constructor(props: any, context: any, opts: any = {}) {
        super(props, context, opts);
        this.regQuickSearchDEFileds();
    }

    /**
     * 初始化部件对象
     * 
     * @memberof IBizMDViewController
     */
    public onInitComponents(): void {
        super.onInitComponents();
        this.$parentDataChanged = false;
        const mdctrl: any = this.getMDCtrl();
        if (mdctrl) {
            // 多数据部件选中
            mdctrl.on(IBizEvent.IBizDataGrid_SELECTIONCHANGE).subscribe((args) => {
                this.onSelectionChange(args);
            });
            // 多数据部件加载之前
            mdctrl.on(IBizEvent.IBizDataGrid_BEFORELOAD).subscribe((args) => {
                this.onStoreBeforeLoad(args);
            });
            // 多数据部件加载完成
            mdctrl.on(IBizEvent.IBizDataGrid_LOADED).subscribe((args) => {
                this.onStoreLoad(args);
            });
            // 多数据部件状态改变
            mdctrl.on(IBizEvent.IBizDataGrid_CHANGEEDITSTATE).subscribe((args) => {
                this.onGridRowEditChange(undefined, args, undefined);
            });
            // 多数据界面行为
            mdctrl.on(IBizEvent.IBizMD_UIACTION).subscribe((agrs) => {
                if (agrs.tag) {
                    this.doUIAction(agrs.tag, agrs.data);
                }
            });

            if (this.isEnableQuickSearch()) {
                const columns: any = mdctrl.getColumns();
                const columns_name: any[] = Object.keys(columns);
                let _quickFields: any[] = [];
                columns_name.forEach(name => {
                    let index: number = this.$quickSearchEntityDEFields.findIndex(item => Object.is(item.name, name));
                    if (index !== -1) {
                        _quickFields.push(columns[name].caption);
                    }
                });

                this.$quickSearchTipInfo = _quickFields.join('/');
            }
        }

        const searchform: any = this.getSearchForm();
        if (searchform) {
            // 搜索表单加载完成
            searchform.on(IBizEvent.IBizForm_FORMLOADED).subscribe((form) => {
                this.onSearchFormSearched(this.isLoadDefault());
            });
            // 搜索表单搜索触发，手动触发
            searchform.on(IBizEvent.IBizSearchForm_FORMSEARCHED).subscribe((args) => {
                this.onSearchFormSearched(true);
            });
            // 搜索表单重置
            searchform.on(IBizEvent.IBizSearchForm_FORMRESETED).subscribe((args) => {
                this.onSearchFormReseted();
            });
            // 搜索表单值变化
            searchform.on(IBizEvent.IBizForm_FORMFIELDCHANGED).subscribe((args) => {
                if (args == null) {
                    return;
                }
                this.onSearchFormFieldChanged(args.fieldname, args.data, args.oldvalue);
            });
        }
    }


    /**
     * 多数据视图加载，加载部件
     * 
     * @memberof IBizMDViewController
     */
    public onLoad(): void {
        super.onLoad();
        if (this.getSearchForm()) {
            let viewparams: any = {};
            Object.assign(viewparams, this.getViewParam());
            this.getSearchForm().autoLoad(viewparams);
        } else if (this.isLoadDefault()) {
            this.load();
        }
    }

    /**
     * 加载多视图部件
     * 
     * @param {*} [opt={}] 
     * @memberof IBizMDViewController
     */
    public load(opt: any = {}): void {
        if (this.getMDCtrl()) {
            this.getMDCtrl().load(opt);
        }
    }

    /**
     * 快捷搜索键盘事件
     *
     * @memberof IBizMDViewController
     */
    public onKeydownQiuckSearch = ($event): void => {
        if (!$event) {
            return;
        }
        if ($event.keyCode !== 13) {
            return;
        }
        this.onQuickSearch();
    }

    /**
     * 执行快速搜索
     * 
     * @memberof IBizMDViewController
     */
    public onQuickSearch = (): void => {
        if (this.isEnableQuickSearch()) {
            this.onSearchFormSearched(true);
        }
    }

    /**
     * 快捷搜索值改变
     *
     * @memberof IBizMDViewController
     */
    // public onQuickSearchValueChange = ({ target }): void => {
    //     if (target) {
    //         this.$searchValue = target.value;
    //     }
    // }

    public onQuickSearchValueChange = ( target ): void => {
        if (target) {
            this.$searchValue = target;
        }
    }

    /**
     * 清空快速搜索值
     * 
     * @memberof IBizMDViewController
     */
    public clearQuickSearchValue(): void {
        this.$searchValue = '';
        this.onRefresh();
    }

    /**
     * 搜索表单打开
     * 
     * @returns {void} 
     * @memberof IBizMDViewController
     */
    public openSearchForm = (): void => {
        const searchForm = this.getSearchForm();
        if (searchForm) {
            searchForm.openChange();
        }
    }

    /**
     * 获取搜索表单对象
     * 
     * @returns {*} 
     * @memberof IBizMDViewController
     */
    public getSearchForm(): any {
        return undefined;
    }

    /**
     * 获取所有多项数据
     * 
     * @returns {any[]} 
     * @memberof IBizMDViewController
     */
    public getAllData(): any[] {
        if (this.getMDCtrl()) {
            return this.getMDCtrl().getAllData();
        }
        return [];
    }

    /**
     * 搜索表单属性值发生变化
     * 
     * @param {string} fieldname 
     * @param {*} field 
     * @param {*} value 
     * @memberof IBizMDViewController
     */
    public onSearchFormFieldChanged(fieldname: string, field: any, value: any): void { }

    /**
     * 数据加载之前
     * 
     * @param {any} sender 
     * @param {any} args 
     * @param {any} e 
     * @memberof IBizMDViewController
     */
    public onStoreBeforeLoad(args): void {
        let fetchParam = {};
        if (this.getViewParam() && Object.keys(this.getViewParam()).length > 0) {
            Object.assign(fetchParam, this.getViewParam());
        }
        if (this.getParentMode() && Object.keys(this.getParentMode()).length > 0) {
            Object.assign(fetchParam, this.getParentMode());
        }
        if (this.getParentData() && Object.keys(this.getParentData()).length > 0) {
            Object.assign(fetchParam, this.getParentData());
        }
        if ((this.getSearchForm() && this.getSearchCond() && this.getSearchForm().isOpen()) || !this.isEnableQuickSearch()) {
            Object.assign(fetchParam, this.getSearchCond());
        }
        // //是否有自定义查询
        // if (this.searchform && this.searchform.isCustomSearch()) {
        // 	Object.assign(fetchParam, this.searchform.getCustomSearchVal());
        // }

        // 获取快速搜索里的搜索参数
        if (this.isEnableQuickSearch() && this.$searchValue !== undefined) {
            Object.assign(fetchParam, { 'query': this.$searchValue });
        }
        Object.assign(args, fetchParam);
    }

    /**
     * 数据加载完成
     * 
     * @param {any} sender 
     * @param {any} args 
     * @param {any} e 
     * @memberof IBizMDViewController
     */
    public onStoreLoad(args): void {

        let lastActive: any;
        if (this.$currentDataKey != null && this.$currentDataKey !== '' && args && args.items) {
            args.items.forEach((element) => {
                if (element.srfkey === this.$currentDataKey) {
                    lastActive = element;
                }
            });
        }
        if (lastActive) {
            this.getMDCtrl().setSelection(lastActive);
            this.calcToolbarItemState(true, lastActive.srfdataaccaction);
        } else {
            this.$currentDataKey = undefined;
            this.fire(IBizEvent.IBizMDViewController_SELECTIONCHANGE, []);
            this.calcToolbarItemState(false);
        }
        this.$parentDataChanged = false;
        this.calcToolbarItemState(false);
        this.reloadUICounters();
    }

    /**
     * 数据被激活<最典型的情况就是行双击>
     * 
     * @param {*} [record={}] 行记录
     * @returns {void} 
     * @memberof IBizMDViewController
     */
    public onDataActivated(record: any = {}): void {
        if (!record || !record.srfkey) {
            return;
        }
        this.fire(IBizEvent.IBizMDViewController_DATAACTIVATED, [record]);
        this.$currentDataKey = record.srfkey;

        this.calcToolbarItemState(true, record.srfdataaccaction);
        this.onEditData({ data: record });
    }

    /**
     * 行选择变化
     * 
     * @param {any[]} selected 
     * @memberof IBizMDViewController
     */
    public onSelectionChange(selected: any[]): void {
        if (selected == null || selected.length === 0) {
            this.$currentDataKey = undefined;
        } else {
            this.$currentDataKey = selected[0].srfkey;
        }
        this.fire(IBizEvent.IBizMDViewController_SELECTIONCHANGE, selected[0]);
        this.calcToolbarItemState(this.$currentDataKey !== undefined, (this.$currentDataKey !== undefined) ? selected[0].srfdataaccaction : null);
    }

    /**
     * 改变工具栏启用编辑按钮信息
     * 
     * @param {any} sender 
     * @param {any} args 
     * @param {any} e 
     * @memberof IBizMDViewController
     */
    public onGridRowEditChange(sender, args, e): void {
        // var editButton = null;
        // var submitButton = null;
        // if (this.toolbar && this.toolbar.items) {
        //     $.each(this.toolbar.items, function (index, ele) {
        //         if (ele.attr('data-ibiz-tag') == 'NewRow')
        //             submitButton = ele;
        //         if (ele.attr('data-ibiz-tag') == 'ToggleRowEdit')
        //             editButton = ele;
        //     });
        // }
        // this.$isInGridRowEdit = args.state;
        // if (editButton) {
        //     if (!args.state) {
        //         editButton.find('span').html($IGM('MDVIEWCONTROLLER.ONGRIDROWEDITCHANGE.ENABLE', '启用编辑'));
        //     } else {
        //         editButton.find('span').html($IGM('MDVIEWCONTROLLER.ONGRIDROWEDITCHANGE.ENABLE2', '关闭编辑'));
        //     }
        // }
        // if (submitButton)
        //     submitButton[0].disabled = !args.state;
    }

    /**
     * 计算工具栏项状态-<例如 根据是否有选中数据,设置 工具栏按钮是否可点击>
     * 
     * @param {boolean} hasdata 是否有数据
     * @param {*} [dataaccaction] 
     * @memberof IBizMDViewController
     */
    public calcToolbarItemState(hasdata: boolean, dataaccaction?: any): void {
        super.calcToolbarItemState(hasdata, dataaccaction);
        const toolbar = this.getToolBar();
        if (!toolbar) {
            return;
        }

        if (Object.keys(toolbar.getItems()).length > 0) {
            const name_arr: any[] = Object.keys(toolbar.getItems());
            const btn_items = toolbar.getItems();
            name_arr.forEach((name) => {
                let item: any = btn_items[name];
                if (Object.is(item.tag, 'NewRow')) {
                    toolbar.setItemDisabled(name, false);
                }
            });
        }
    }

    /**
     * 实体数据发生变化
     *
     * @param {*} [dataaccaction={}]
     * @memberof IBizMDViewController
     */
    public onDataAccActionChange(dataaccaction: any = {}): void {
        const toolBar = this.getToolBar();
        if (!toolbar) {
            return;
        }
        toolBar.updateAccAction(Object.assign({}, this.$dataaccaction, dataaccaction));

        // if (this.getToolbar())
        //     this.getToolbar().updateAccAction(dataaccaction);
        // if (this.mintoolbar)
        //     this.mintoolbar.updateAccAction(dataaccaction);
        // if (this.floattoolbar)
        //     this.floattoolbar.updateAccAction(dataaccaction);
    }

    /**
     * 新建数据
     * 
     * @returns {void} 
     * @memberof IBizMDViewController
     */
    public onNewData(): void {
        let loadParam = {};
        if (this.getViewParam()) {
            Object.assign(loadParam, this.getViewParam());
        }
        if (this.getParentMode()) {
            Object.assign(loadParam, this.getParentMode());
        }
        if (this.getParentData()) {
            Object.assign(loadParam, this.getParentData());
        }
        if (this.$isInGridRowEdit) {
            this.doNewRow(loadParam);
            return;
        }
        if (this.isEnableBatchAdd()) {
            this.doNewDataBatch(loadParam);
            return;
        }
        if (this.doNewDataWizard(loadParam)) {
            return;
        }
        this.doNewDataNormal(loadParam);
    }

    /**
     * 批量新建
     *
     * @param {*} [arg={}]
     * @returns {boolean}
     * @memberof IBizMDViewController
     */
    public doNewDataBatch(arg: any = {}): boolean {
        const mpickupview = this.getMPickupView(arg);
        if (mpickupview && !Object.is(mpickupview.className, '')) {
            this.openModal(mpickupview).then((data) => {
                console.log(data);
                if (data && Object.is(data.ret, 'OK')) {
                    this.onMPickupWindowClose(data.selection);
                }
            });
            return true;
        }
        return false;
    }

    /**
     * 批量新建关闭
     *
     * @param {any[]} selection
     * @returns {void}
     * @memberof IBizMDViewController
     */
    public onMPickupWindowClose(selection: any[]): void {
        if (selection) {
            this.addDataBatch(selection);
        }
        return;
    }

    /**
     * 批量添加数据
     *
     * @param {any[]} selectedDatas
     * @memberof IBizMDViewController
     */
    public addDataBatch(selectedDatas: any[]): void {
        // this.$notification.warning('警告', '[addDataBatch]方法必须重写！');
    }

    /**
     * 向导新建数据
     * 
     * @param {any} arg 
     * @returns {boolean} 
     * @memberof IBizMDViewController
     */
    public doNewDataWizard(arg): boolean {
        let hasWizardView = false;
        const wizardView = this.getNewDataWizardView(arg);
        if (wizardView) {

            // 打开模态框
            this.openModal(wizardView).then((result) => {
                if (result && Object.is(result.ret, 'OK')) {
                    const data: any = result.selection[0];
                    this.doNewDataNormal(Object.assign({ srfnewmode: data.srfkey }, arg));
                }
            });
            hasWizardView = true;
        }
        return hasWizardView;
    }

    /**
     * 向导新建数据窗口关闭
     * 
     * @param {any} win 
     * @param {any} eOpts 
     * @returns {void} 
     * @memberof IBizMDViewController
     */
    public onNewDataWizardWindowClose(win, eOpts): void {
        // var this = win.scope;
        // var loadParam = {};//win.userData;
        // var dialogResult = win.dialogResult;
        // if (!dialogResult) return;
        // if (dialogResult == 'ok') {
        //     var selectedData = win.selectedData;
        //     if (selectedData) {
        //         var newMode = selectedData.srfkey;
        //         loadParam.srfnewmode = newMode;
        //         var view = this.getNewDataView(loadParam);
        //         if (view == null) {
        //             return;
        //         }
        //         this.openDataView(view);
        //     }
        // }
        // return;
    }

    /**
     * 常规新建数据
     * 
     * @param {any} arg 
     * @returns {*} 
     * @memberof IBizMDViewController
     */
    public doNewDataNormal(arg): any {
        let view = this.getNewDataView(arg);
        if (view == null) {
            return false;
        }
        const openMode = view.openMode;
        if (!openMode || Object.is(openMode, '')) {
            view.openMode = 'INDEXVIEWTAB';
        }
        if (!view.state) {
            view.state = 'new';
            let viewParam: any = {};
            Object.assign(viewParam, view.viewParam);

            if (viewParam && viewParam.srfnewmode && !Object.is(viewParam.srfnewmode, '')) {
                const srfnewmode: string = viewParam.srfnewmode.split('@').join('__');
                view.state = view.state + '_' + srfnewmode.toLowerCase();
            }
        }
        return this.openDataView(view);
    }

    /**
     * 编辑数据
     * 
     * @param {any} arg 
     * @memberof IBizMDViewController
     */
    public onEditData(arg): void {
        let loadParam: any = {};
        if (this.getViewParam()) {
            Object.assign(loadParam, this.getViewParam());
        }
        if (this.getParentMode()) {
            Object.assign(loadParam, this.getParentMode());
        }
        if (this.getParentData()) {
            Object.assign(loadParam, this.getParentData());
        }
        if (arg.srfcopymode) {
            Object.assign(loadParam, {
                srfsourcekey: arg.data.srfkey
            });
        } else {
            Object.assign(loadParam, { srfkey: arg.data.srfkey, srfdeid: arg.data.srfdeid });
        }

        let editMode = this.getEditMode(arg.data);
        if (editMode) {
            loadParam.srfeditmode = editMode;
            loadParam.srfviewmode = editMode;
        }
        if (arg.data.srfmstag) {
            loadParam.srfeditmode2 = arg.data.srfmstag;
        }
        this.doEditDataNormal(loadParam);
    }

    /**
     * 执行常规编辑数据
     * 
     * @param {*} [arg={}] 
     * @returns {*} 
     * @memberof IBizMDViewController
     */
    public doEditDataNormal(arg: any = {}): any {
        let view = this.getEditDataView(arg);
        if (view == null) {
            return false;
        }
        let openMode = view.openMode;
        if (!openMode || Object.is(openMode, '')) {
            view.openMode = 'INDEXVIEWTAB';
        }
        if (!view.state) {
            view.state = 'edit';

            let viewParam: any = {};
            Object.assign(viewParam, view.viewParam);

            if (Object.keys(viewParam).length > 0) {
                let srfeditmode: string = '';
                if (viewParam.srfeditmode && !Object.is(viewParam.srfeditmode, '')) {
                    srfeditmode = viewParam.srfeditmode.split('@').join('__');
                }
                // 实体主状态
                if (viewParam.srfeditmode2 && !Object.is(viewParam.srfeditmode2, '') && !Object.is(viewParam.srfeditmode2, 'MSTAG:null')) {
                    srfeditmode = viewParam.srfeditmode2.split(':').join('__');
                }

                if (!Object.is(srfeditmode, '')) {
                    view.state = `${view.state}_${srfeditmode.toLowerCase()}`;
                }
            }
        }
        return this.openDataView(view);
    }

    /**
     * 打开数据视图
     *
     * @param {*} [view={}]
     * @returns {boolean}
     * @memberof IBizMDViewController
     */
    public openDataView(view: any = {}): boolean {
        const openMode = view.openMode;

        if (view.redirect) {
            this.redirectOpenView(view);
            return false;
        }

        if (!openMode || Object.is(openMode, 'INDEXVIEWTAB')) {
            let data: any = {};
            Object.assign(data, view.viewParam);
            this.openView(view.viewUrl, data);
            return false;
        }

        if (Object.is(openMode, 'POPUPMODAL')) {
            view.modal = true;
        } else if (Object.is(openMode, 'POPUP')) {
            view.modal = true;
        } else if (Object.is(openMode, '') || Object.is(openMode, 'INDEXVIEWTAB')) {
            view.modal = false;
        }

        if (!view.modal) {
            return false;
        }
        const modalCom = this.getModalView(view.className);
        this.openModal(modalCom, view.viewParam).then((result) => {
            if (result && Object.is(result.ret, 'OK')) {
                this.onRefresh();
            }
        });
        return true;
    }

    /**
     * 打开数据视图;打开方式,路由打开
     * 
     * @param {string} routeString 相对路由地址
     * @param {*} [routeParam={}] 激活路由参数
     * @param {*} [queryParams] 路由全局查询参数
     * @memberof IBizViewController
     */
    public openView(routeString: string, routeParam: any = {}, queryParams: any = {}) {
        const path = {
            pathname: `${this.$match.url}/${routeString}/${encodeURIComponent(JSON.stringify(routeParam))}`,
            query: queryParams
        }
        this.$history.push(path);
    }

    /**
     * 获取编辑模式
     * 
     * @param {any} data 
     * @returns {*} 
     * @memberof IBizMDViewController
     */
    public getEditMode(data): any {
        return data.srfdatatype;
    }

    /**
     * 获取编辑视图
     * 
     * @param {any} arg 
     * @returns {*} 
     * @memberof IBizMDViewController
     */
    public getEditDataView(arg): any {
        return undefined
    }

    /**
     * 获取新建视图
     * 
     * @param {any} arg 
     * @returns {*} 
     * @memberof IBizMDViewController
     */
    public getNewDataView(arg): any {
        return undefined;
    }

    /**
     * 获取新建向导视图
     * 
     * @param {any} arg 
     * @returns {*} 
     * @memberof IBizMDViewController
     */
    public getNewDataWizardView(arg): any {
        return undefined;
    }

    /**
     * 获取多选视图
     * 
     * @param {any} arg 
     * @returns {*} 
     * @memberof IBizMDViewController
     */
    public getMPickupView(arg): any {
        return undefined;
    }

    /**
     * 获取多数据对象
     * 
     * @returns {*} 
     * @memberof IBizMDViewController
     */
    public getMDCtrl(): any {
        return this.getControl('mdctrl');
    }

    /**
     * 视图刷新
     * 
     * @memberof IBizMDViewController
     */
    public onRefresh(): void {
        super.onRefresh();
        if (this.getMDCtrl()) {
            this.getMDCtrl().load();
        }
    }

    /**
     * 
     * 
     * @memberof IBizMDViewController
     */
    public onSetParentData(): void {
        super.onSetParentData()
        this.$parentDataChanged = true;
    }

    /**
     * 获取搜索条件
     * 
     * @returns {*} 
     * @memberof IBizMDViewController
     */
    public getSearchCond(): any {
        if (this.getSearchForm()) {
            return this.getSearchForm().getValues();
        }
        return undefined;
    }

    /**
     * 搜索表单搜索执行
     * 
     * @param {boolean} isload 是否加载数据
     * @memberof IBizMDViewController
     */
    public onSearchFormSearched(isload: boolean): void {
        if (this.getMDCtrl() && isload) {
            // this.getMDCtrl().setCurPage(1);
            this.getMDCtrl().load();
        }
    }

    /**
     * 搜索表单重置完成
     * 
     * @memberof IBizMDViewController
     */
    public onSearchFormReseted(): void {
        if (this.getMDCtrl()) {
            this.getMDCtrl().load();
        }
    }

    /**
     * 
     * 
     * @param {*} [uiaction={}] 
     * @param {*} [params={}] 
     * @returns {void} 
     * @memberof IBizMDViewController
     */
    public doDEUIAction(uiaction: any = {}, params: any = {}): void {
        if (Object.is(uiaction.tag, 'ToggleFilter')) {
            this.openSearchForm();
            return;
        }
        if (Object.is(uiaction.tag, 'Help')) {
            this.doHelp(params);
            return;
        }
        if (Object.is(uiaction.tag, 'Edit')) {
            this.doEdit(params);
            return;
        }
        if (Object.is(uiaction.tag, 'View')) {
            this.doView(params);
            return;
        }
        if (Object.is(uiaction.tag, 'Print')) {

            this.doPrint(params);
            return;
        }
        if (Object.is(uiaction.tag, 'ExportExcel')) {
            this.doExportExcel(params);
            return;
        }
        if (Object.is(uiaction.tag, 'ExportModel')) {
            this.doExportModel(params);
            return;
        }
        if (Object.is(uiaction.tag, 'Copy')) {
            this.doCopy(params);
            return;
        }
        if (Object.is(uiaction.tag, 'Remove')) {
            this.doRemove(params);
            return;
        }
        if (Object.is(uiaction.tag, 'Import')) {
            this.doImport(params);
            return;
        }
        if (Object.is(uiaction.tag, 'Refresh')) {
            this.doRefresh(params);
            return;
        }
        if (Object.is(uiaction.tag, 'NewRow')) {
            this.doCheck(params);
            return;
        }
        if (Object.is(uiaction.tag, 'New')) {
            this.doNew(params);
            return;
        }
        if (Object.is(uiaction.tag, 'ToggleRowEdit')) {
            this.doToggleRowEdit(params);
            return;
        }
        super.doDEUIAction(uiaction, params);
    }

    /**
     * 多数据项界面_行编辑操作
     * 
     * @param {any} params 
     * @memberof IBizMDViewController
     */
    public doToggleRowEdit(params): void {
        if (this.getMDCtrl() && typeof (this.getMDCtrl().isOpenEdit) === 'function') {
            this.getMDCtrl().isOpenEdit(params);
        }
    }

    /**
     * 多数据项界面_新建行操作
     * 
     * @param {any} params 
     * @memberof IBizMDViewController
     */
    public doNewRow(params): void {
        if (this.getMDCtrl() && typeof (this.getMDCtrl().newRowAjax) === 'function') {
            this.getMDCtrl().newRowAjax(params);
        }
    }

    /**
     * 多数据项界面_检测行操作
     * 
     * @param {any} params 
     * @memberof IBizMDViewController
     */
    public doCheck(params): void {
        if (this.getMDCtrl() && typeof (this.getMDCtrl().quitEdit) === 'function') {
            this.getMDCtrl().quitEdit();
        }
    }

    /**
     * 多数据项界面_帮助操作
     * 
     * @memberof IBizMDViewController
     */
    public doHelp(params): void {
        // this.$notification.warning('警告', '帮助操作');
    }

    /**
     * 多数据项界面_编辑操作
     * 
     * @param {any} params 
     * @returns {void} 
     * @memberof IBizMDViewController
     */
    public doEdit(params): void {

        // 获取要编辑的数据集合
        if (params && params.srfkey) {
            // if ($.isFunction(this.getMDCtrl().findItem)) {
            //     params = this.getMDCtrl().findItem('srfkey', params.srfkey);
            // }
            const arg = { data: params };
            this.onEditData(arg);
            return;
        }
        const selectedData = this.getMDCtrl().getSelection();
        if (selectedData == null || selectedData.length === 0) {
            return;
        }

        this.onEditData({ data: selectedData[0] });
    }

    /**
     * 多数据项界面_行编辑操作
     * 
     * @param {any} params 
     * @memberof IBizMDViewController
     */
    public doView(params): void {
        this.doEdit(params);
    }

    /**
     * 多数据项界面_打印操作
     * 
     * @param {any} params 
     * @memberof IBizMDViewController
     */
    public doPrint(params): void {

    }

    /**
     * 多数据项界面_导出操作（Excel）
     * 
     * @param {any} params 
     * @memberof IBizMDViewController
     */
    public doExportExcel(params): void {
        // IBizNotification.warning('警告', '导出操作（Excel）');
    }

    /**
     * 多数据项界面_导出数据模型
     * 
     * @param {any} params 
     * @memberof IBizMDViewController
     */
    public doExportModel(params): void {
        // IBizNotification.warning('警告', '导出数据模型');
    }

    /**
     * 多数据项界面_拷贝操作
     * 
     * @param {any} params 
     * @returns {void} 
     * @memberof IBizMDViewController
     */
    public doCopy(params): void {
        // 获取要拷贝的数据集合
        if (!this.getMDCtrl()) {
            return;
        }
        const selectedData = this.getMDCtrl().getSelection();
        if (selectedData == null || selectedData.length === 0) {
            return;
        }

        const arg = { data: selectedData[0], srfcopymode: true };
        this.onEditData(arg);
    }

    /**
     * 多数据项界面_删除操作
     * 
     * @param {any} params 
     * @memberof IBizMDViewController
     */
    public doRemove(params): void {
        // IBizNotification.warning('警告', '删除操作');
    }

    /**
     * 多数据项界面_数据导入栏
     * 
     * @param {any} params 
     * @memberof IBizMDViewController
     */
    public doImport(params): void {
        if (this.getMDCtrl() && this.getDEName() !== '') {
            this.getMDCtrl().doImportData(this.getDEName());
        }
    }

    /**
     * 多数据项界面_刷新操作
     * 
     * @param {any} params 
     * @memberof IBizMDViewController
     */
    public doRefresh(params): void {
        this.onRefresh();
    }

    /**
     * 多数据项界面_新建操作
     * 
     * @param {any} params 
     * @memberof IBizMDViewController
     */
    public doNew(params): void {
        this.onNewData();
    }

    /**
     * 
     * 
     * @param {*} [uiaction={}] 
     * @param {*} [params={}] 
     * @memberof IBizMDViewController
     */
    public doWFUIAction(uiaction: any = {}, params: any = {}): void {
        if (Object.is(uiaction.actionmode, 'WFBACKEND')) {
            const selectedData = this.getMDCtrl().getSelection();
            if (selectedData == null || selectedData.length === 0) {
                return;
            }

            let keys = '';

            selectedData.forEach((element, index) => {
                let key: string = element.srfkey;
                if (!Object.is(keys, '')) {
                    keys += ';';
                }
                keys += key;
            });

            if (this.getMDCtrl()) {
                this.getMDCtrl().wfsubmit({ srfwfiatag: uiaction.tag, srfkeys: keys });
                return;
            }
        }
        super.doWFUIAction(uiaction, params);
    }

    /**
     * 
     * 
     * @param {any} win 
     * @param {any} data 
     * @memberof IBizMDViewController
     */
    public onWFUIFrontWindowClosed(win, data): void {
        // this.load();
        this.onRefresh();
    }

    /**
     * 获取UI操作参数
     * 
     * @param {*} [uiaction={}] 
     * @param {*} [params={}] 
     * @returns {*} 
     * @memberof IBizMDViewController
     */
    public getFrontUIActionParam(uiaction: any = {}, params: any = {}): any {

        let arg: any = {};
        const front_arg = super.getFrontUIActionParam(uiaction, params);
        if (front_arg) {
            Object.assign(arg, front_arg);
        }
        if (this.getParentMode()) {
            Object.assign(arg, this.getParentMode());
        }
        if (this.getParentData()) {
            Object.assign(arg, this.getParentData());
        }
        let target = 'NONE';
        if (uiaction.actiontarget) {
            target = uiaction.actiontarget;
        }
        if (!Object.is(target, 'NONE')) {
            const selectedData: any[] = this.getMDCtrl().getSelection();
            if (!(selectedData == null || selectedData.length === 0)) {

                let uiparamjo: any = {};
                let resourcename: string = '';
                let targetname: string = '';
                let resultkeys: string = '';
                if (uiaction.actionparams) {
                    const actionparams = uiaction.actionparams;
                    if (Object.keys(actionparams.paramjo).length > 0) {
                        Object.assign(uiparamjo, actionparams.paramjo);
                    }
                    // 原属性
                    if (!Object.is(actionparams.vlaueitem, '')) {
                        resourcename = actionparams.vlaueitem.toLowerCase();
                    }
                    // 处理后属性
                    if (!Object.is(actionparams.paramitem, '')) {
                        targetname = actionparams.paramitem.toLowerCase();
                    }
                }

                if (Object.is(target, 'SINGLEKEY')) {
                    arg.srfkeys = selectedData[0].srfkey;
                    if (!Object.is(resourcename, '') && selectedData[0].hasOwnProperty(resourcename)) {
                        resultkeys = selectedData[0][resourcename];
                    }
                } else if (Object.is(target, 'SINGLEDATA')) {
                    Object.assign(arg, selectedData[0]);
                    if (!Object.is(resourcename, '') && selectedData[0].hasOwnProperty(resourcename)) {
                        resultkeys = selectedData[0][resourcename];
                    }
                } else if (Object.is(target, 'MULTIKEY')) {
                    let keys = '';
                    selectedData.forEach(item => {
                        const key = item.srfkey;
                        if (!Object.is(keys, '')) {
                            keys += ';';
                        }
                        keys += key;

                        if (!Object.is(resultkeys, '')) {
                            resultkeys += ';';
                        }
                        if (!Object.is(resourcename, '') && item.hasOwnProperty(resourcename)) {
                            resultkeys += item[resourcename];
                        }

                    });
                    Object.assign(arg, { srfkeys: keys });
                }

                if (Object.keys(uiparamjo).length > 0) {
                    Object.assign(arg, uiparamjo);
                }

                if (!Object.is(resultkeys, '')) {
                    Object.assign(arg, { srfkeys: resultkeys });
                }
                if (!Object.is(targetname, 'srfkey') && !Object.is(targetname, 'srfkeys')) {
                    arg[targetname] = resultkeys;
                }
            }
        }
        return arg;
    }

    /**
     * 获取后天界面行为参数
     * 
     * @param {*} [uiaction={}] 
     * @param {*} [params={}] 
     * @returns {*} 
     * @memberof IBizMDViewController
     */
    public getBackendUIActionParam(uiaction: any = {}, params: any = {}): any {
        let arg: any = {};
        if (this.getParentMode()) {
            Object.assign(arg, this.getParentMode());
        }
        if (this.getParentData()) {
            Object.assign(arg, this.getParentData());
        }
        let bSingle = false;
        if (Object.is(uiaction.actiontarget, 'SINGLEKEY')) {
            bSingle = true;
        }
        const selectedData: any[] = this.getMDCtrl().getSelection();
        if (!(selectedData == null || selectedData.length === 0)) {

            let uiparamjo: any = {};
            let resourcename: string = '';
            let targetname: string = '';
            let resultkeys: string = '';
            if (uiaction.actionparams) {
                const actionparams = uiaction.actionparams;
                if (Object.keys(actionparams.paramjo).length > 0) {
                    Object.assign(uiparamjo, actionparams.paramjo);
                }
                // 原属性
                if (!Object.is(actionparams.vlaueitem, '')) {
                    resourcename = actionparams.vlaueitem.toLowerCase();
                }
                // 处理后属性
                if (!Object.is(actionparams.paramitem, '')) {
                    targetname = actionparams.paramitem.toLowerCase();
                }
            }

            let keys = '';
            if (bSingle) {
                keys = selectedData[0].srfkey;
                if (!Object.is(resourcename, '') && selectedData[0].hasOwnProperty(resourcename)) {
                    resultkeys = selectedData[0][resourcename];
                }
            } else {
                selectedData.forEach(item => {
                    let key = item.srfkey;
                    if (!Object.is(keys, '')) {
                        keys += ';';
                    }
                    keys += key;

                    if (!Object.is(resultkeys, '')) {
                        resultkeys += ';';
                    }
                    if (!Object.is(resourcename, '') && item.hasOwnProperty(resourcename)) {
                        resultkeys += item[resourcename];
                    }
                });
            }
            Object.assign(arg, { srfkeys: keys });

            if (Object.keys(uiparamjo).length > 0) {
                Object.assign(arg, uiparamjo);
            }

            if (!Object.is(resultkeys, '')) {
                Object.assign(arg, { srfkeys: resultkeys });
            }
            if (!Object.is(targetname, 'srfkey') && !Object.is(targetname, 'srfkeys')) {
                arg[targetname] = resultkeys;
            }
        }
        return arg;
    }


    /**
     * 移动记录
     * 
     * @param {any} target 
     * @returns {*} 
     * @memberof IBizMDViewController
     */
    public moveRecord(target): any {
    }

    /**
     * 
     * 
     * @param {any} arg 
     * @memberof IBizMDViewController
     */
    public doBackendUIAction(arg): void {
        if (this.getMDCtrl()) {
            this.getMDCtrl().doUIAction(arg);
        }
    }

    /**
     * 隐藏关系列
     * 
     * @param {any} parentMode 
     * @memberof IBizMDViewController
     */
    public doHideParentColumns(parentMode): void {
    }

    /**
     * 
     * 
     * @param {any} arg 
     * @memberof IBizMDViewController
     */
    public onPrintData(arg): void {
        this.doPrintDataNormal(arg);
    }

    /**
     * 常规新建数据
     * 
     * @param {any} arg 
     * @returns {boolean} 
     * @memberof IBizMDViewController
     */
    public doPrintDataNormal(arg): boolean {

        // var view = this.getPrintDataView(arg);
        // if (view == null) {
        //     return false;
        // }
        // var viewurl = view.viewurl;
        // if (!viewurl || viewurl == '') {
        //     viewurl = BASEURL + '/ibizutil/print.pdf';
        // }
        // else {
        //     viewurl = BASEURL + viewurl;
        // }
        // viewurl = viewurl + (viewurl.indexOf('?') == -1 ? '?' : '&') + $.param(view.viewparam);
        // window.open(viewurl, '_blank');
        return true;
    }

    /**
     * 
     * 
     * @param {any} arg 
     * @returns {*} 
     * @memberof IBizMDViewController
     */
    public getPrintDataView(arg): any {
        // return null;
        return undefined;
    }

    /**
     * 是否默认加载
     *
     * @returns {boolean}
     * @memberof IBizMDViewController
     */
    public isLoadDefault(): boolean {
        return true;
    }

    /**
     * 支持批量添加
     * 
     * @returns {boolean} 
     * @memberof IBizMDViewController
     */
    public isEnableBatchAdd(): boolean {
        return false;
    }

    /**
     * 是否支持快速搜索
     * 
     * @returns {boolean} 
     * @memberof IBizMDViewController
     */
    public isEnableQuickSearch(): boolean {
        return true;
    }

    /**
     * 只支持批量添加
     * 
     * @returns {boolean} 
     * @memberof IBizMDViewController
     */
    public isBatchAddOnly(): boolean {
        return false;
    }

    /**
     * 是否支持行编辑
     *
     * @returns {boolean}
     * @memberof IBizMDViewController
     */
    public isEnableRowEdit(): boolean {
        return false;
    }

    /**
     * 是否支持多选
     * 
     * @returns {boolean} 
     * @memberof IBizMDViewController
     */
    public isEnableMultiSelect(): boolean {
        return this.$multiSelect;
    }

    /**
     * 设置支持多选
     *
     * @param {boolean} multiSelect
     * @memberof IBizMDViewController
     */
    public setEnableMultiSelect(multiSelect: boolean): void {
        this.$multiSelect = multiSelect;
    }

    /**
     * 注册快速搜索实体属性
     * 
     * @memberof IBizMDViewController
     */
    public regQuickSearchDEFileds(): void {

    }
}