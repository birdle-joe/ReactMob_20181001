import { IBizControl } from './IBizControl';
import { IBizEvent } from '../IBizEvent';
import { IBizUtil } from '../util/IBizUtil';

/**
 * 多项数据部件服务对象
 * 
 * @export
 * @class IBizMDControl
 * @extends {IBizControl}
 */
export class IBizMDControl extends IBizControl {

    /**
     * 多数据列头
     *
     * @type {*}
     * @memberof IBizMDControl
     */
    public $columns: any = {};

    /**
     * 所有数据项
     * 
     * @type {any[]}
     * @memberof IBizMDControl
     */
    public $items: any[] = [];

    /**
     * 选中数据项
     * 
     * @type {any[]}
     * @memberof IBizMDControl
     */
    public $selection: any[] = [];

    /**
     * 加载状态
     * 
     * @memberof IBizMDControl
     */
    public $loading = false;

    /**
     * Creates an instance of IBizMDControl.
     * @param {*} props
     * @param {*} context
     * @param {*} [opts={}]
     * @memberof IBizMDControl
     */
    constructor(props: any, context: any, opts: any = {}) {
        super(props, context, opts);
        this.regColumns();
    }

    /**
     * 加载数据
     * 
     * @param {*} [arg={}] 
     * @returns {void} 
     * @memberof IBizMDControl
     */
    public load(arg: any = {}): void { }

    /**
     * 刷新数据
     * @param arg 
     */
    public refresh(arg: any = {}): void { }

    /**
     * 设置选中项
     * 
     * @param {any[]} selection 
     * @memberof IBizMDControl
     */
    public setSelection(selection: any[]): void {
        this.$selection = selection;
        this.fire(IBizEvent.IBizDataGrid_SELECTIONCHANGE, this.$selection);
    }

    /**
     * 选中对象
     * 
     * @param {*} [item={}] 
     * @returns {void} 
     * @memberof IBizMDControl
     */
    public clickItem(item: any = {}): void {
        if (this.$loading) {
            return;
        }
        this.setSelection([item]);
    }

    /**
     * 
     * 
     * @param {any} item 
     * @memberof IBizMDControl
     */
    public activeItem(item): void { }

    /**
     * 
     * 
     * @returns {boolean} 
     * @memberof IBizMDControl
     */
    public isloading(): boolean {
        return this.$loading;
    }

    /**
     * 获取列表中某条数据
     * 
     * @param {string} name 字段
     * @param {string} value 名称
     * @returns {*} 
     * @memberof IBizMDControl
     */
    public findItem(name: string, value: string): any {
        let item: any;
        this.$items.forEach((element: any) => {
            if (Object.is(element[name], value)) {
                item = element;
                return;
            }
        });
        return item;
    }

    /**
     * 删除数据
     * 
     * @param {*} [arg={}] 
     * @memberof IBizMDControl
     */
    public remove(arg: any = {}): void { }

    /**
     * 获取选中数据
     * 
     * @returns {any[]} 
     * @memberof IBizMDControl
     */
    public getSelection(): any[] {
        return this.$selection;
    }

    /**
     * 工作流提交
     * 
     * @param {*} [params={}] 
     * @memberof IBizMDControl
     */
    public wfsubmit(params: any = {}): void {
        if (!params) {
            params = {};
        }
        Object.assign(params, { srfaction: 'wfsubmit', srfctrlid: this.getName() });
        this.post(params).subscribe((data) => {
            if (data.ret === 0) {
                this.refresh();
            } else {
                this.showToast(this.$showErrorToast, '', '执行工作流操作失败,' + data.info);
            }
        }, (error) => {
            this.showToast(this.$showErrorToast, '', '执行工作流操作失败,' + error.info);
        });
    }

    /**
     * 实体界面行为
     * 
     * @param {*} [params={}] 
     * @memberof IBizMDControl
     */
    public doUIAction(arg: any = {}): void {
        let params: any = {};
        if (arg) {
            Object.assign(params, arg);
        }
        Object.assign(params, { srfaction: 'uiaction', srfctrlid: this.getName() });
        this.post(params).subscribe((data) => {
            if (data.ret === 0) {
                if (data.reloadData) {
                    this.refresh();
                }
                if (data.info && !Object.is(data.info, '')) {
                    this.showToast(this.$showSuccessToast, '', '操作成功');
                }
                IBizUtil.processResult(data);
            } else {
                this.showToast(this.$showErrorToast, '操作失败', '操作失败,执行操作发生错误,' + data.info);
            }
        }, (error) => {
            this.showToast(this.$showErrorToast, '操作失败', '操作失败,执行操作发生错误,' + error.info);
        });
    }

    /**
     * 批量添加
     * 
     * @param {*} [arg={}] 
     * @memberof IBizMDControl
     */
    public addBatch(arg: any = {}): void {
        let params: any = {};
        if (arg) {
            Object.assign(params, arg);
        }

        Object.assign(params, { srfaction: 'addbatch', srfctrlid: this.getName() });
        this.post(params).subscribe((data) => {
            if (data.ret === 0) {
                this.refresh();
                this.fire(IBizEvent.IBizDataGrid_ADDBATCHED, data);
            } else {
                this.showToast(this.$showErrorToast, '添加失败', '执行批量添加失败,' + data.info);
            }
        }, (error) => {
            this.showToast(this.$showErrorToast, '添加失败', '执行批量添加失败,' + error.info);
        });
    }

    /**
     * 获取所有数据项
     * 
     * @returns {any[]} 
     * @memberof IBizMDControl
     */
    public getItems(): any[] {
        return this.$items;
    }

    /**
     * 注册多数据列头
     * 
     * @memberof IBizMDControl
     */
    public regColumns(): void { }

    /**
     * 获取多数据列头
     *
     * @returns {*}
     * @memberof IBizMDControl
     */
    public getColumns(): any {
        return this.$columns;
    }

    /**
     * 设置多数据列头
     * 
     * @param {*} [column={}] 
     * @returns {void} 
     * @memberof IBizMDControl
     */
    public regColumn(column: any = {}): void {
        if (Object.keys(column).length === 0) {
            return;
        }
        this.$columns[column.name] = column;
    }

    /**
     * 多数据项界面_数据导入栏
     * 
     * @memberof IBizMDControl
     */
    public doImportData(name: string): void {
        if (Object.is(name, '')) {
            return;
        }
        // this.nzModalService.open({
        //     content: IBizImportdataViewComponent,
        //     wrapClassName: 'ibiz_wrap_modal',
        //     componentParams: { dename: name },
        //     footer: false,
        //     maskClosable: false,
        //     width: 500,
        // }).subscribe((result) => {
        //     if (result && result.ret) {
        //         this.refresh();
        //     }
        // });
    }

    /**
     * 界面行为
     *
     * @param {string} tag
     * @param {*} [data={}]
     * @memberof IBizMDControl
     */
    public uiAction(tag: string, data: any = {}) { }

    /**
     * 渲染绘制多项数据
     *
     * @param {any[]} items
     * @returns {any[]}
     * @memberof IBizMDControl
     */
    public rendererDatas(items: any[]): any[] {
        return items;
    }
}

