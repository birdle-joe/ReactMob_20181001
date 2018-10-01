import { IBizMDViewController } from "./IBizMDViewController";
import { IBizEvent } from "../IBizEvent";
// import { IBizNotification } from "../util/IBizNotification";

/**
 * 表格视图控制
 * 
 * @export
 * @class IBizListViewController
 * @extends {IBizMDViewController}
 */
export class IBizListViewController extends IBizMDViewController {

    /**
     * 导出数据起始页
     * 
     * @type {number}
     * @memberof IBizListViewController
     */
    public $exportStartPage: number;

    /**
     * 导出数据结束页
     * 
     * @type {number}
     * @memberof IBizListViewController
     */
    public $exportEndPage: number;

    /**
     * 导出数据模式
     *  all: 导出全部数据最多1000行
     *  custom: 导出指定页数
     * @type {string}
     * @memberof IBizListViewController
     */
    public $itemtag: string;

    /**
     * Creates an instance of IBizListViewController.
     * @param {*} props
     * @param {*} context
     * @param {*} [opts={}]
     * @memberof IBizListViewController
     */
    constructor(props: any, context: any, opts: any = {}) {
        super(props, context, opts);
    }

    /**
     * 部件初始化
     * 
     * @memberof IBizListViewController
     */
    public onInitComponents(): void {
        super.onInitComponents();
        const list = this.getMDCtrl();
        if (list) {
            // 单击行数据
            list.on(IBizEvent.IBizList_ROWCLICK).subscribe((args) => {
                // if (this.getGridRowActiveMode() === 1) {
                    this.onDataActivated(args[0]);
                // }
            });
        }
    }
   
    /**
     * 获取表格部件对象
     * 
     * @returns {*} 
     * @memberof IBizListViewController
     */
    public getList(): any {
        return this.getMDCtrl();
    }

    /**
     * 获取搜索表单对象
     * 
     * @returns {*} 
     * @memberof IBizListViewController
     */
    public getSearchForm(): any {
        return this.getControl('searchform');
    }

    /**
     * 表格行数据激活模式，默认支持双击激活行数据
     * 
     * @returns {number}  0--不激活，1--单击激活模式，2--双击激活行数据
     * @memberof IBizListViewController
     */
    public getGridRowActiveMode(): number {
        return 2;
    }

    /**
     * 隐藏关系列
     * 
     * @param {any} parentMode 
     * @memberof IBizListViewController
     */
    public doHideParentColumns(parentMode: any): void { }

    /**
     * 隐藏列
     * 
     * @param {any} columnname 
     * @memberof IBizListViewController
     */
    public hideGridColumn(columnname: any): void { }

    /**
     * 删除操作
     * 
     * @param {*} [params={}] 
     * @returns {void} 
     * @memberof IBizListViewController
     */
    public doRemove(params: any = {}): void {
        if (params && params.srfkey) {
            // if ($.isFunction(this.getMDCtrl().findItem)) {
            //     params = this.getMDCtrl().findItem('srfkey', params.srfkey);
            // }
            // //询问框
            // IBiz.confirm($IGM('GRIDVIEWCONTROLLER.DOREMOVE.INFO', '确认要删除数据，删除操作将不可恢复？'), function (result) {
            //     if (result) {
            //         this.removeData({ srfkeys: params.srfkey });
            //     }
            // });
        } else {
            let selectedData = this.getList().getSelection();
            if (!selectedData || selectedData == null || selectedData.length === 0) {
                return;
            }

            let dataInfo = '';

            selectedData.forEach((record, index) => {
                let srfmajortext = record.srfmajortext;
                if (index < 5) {
                    if (!Object.is(dataInfo, '')) {
                        dataInfo += '、';
                    }
                    dataInfo += srfmajortext;
                }
            });


            if (selectedData.length < 5) {
                dataInfo = dataInfo + '共' + selectedData.length + '条数据';
            } else {
                dataInfo = dataInfo + '...' + '共' + selectedData.length + '条数据';
            }

            dataInfo = dataInfo.replace(/[null]/g, '').replace(/[undefined]/g, '').replace(/[ ]/g, '');

            // 询问框
            // IBizNotification.confirm('警告', '确认要删除 ' + dataInfo + '，删除操作将不可恢复？').then((result) => {
            //     if (result && Object.is(result, 'OK')) {
            //         this.removeData(null);
            //     }
            // });
        }

    }

    /**
     * 删除数据
     * 
     * @param {*} [arg={}] 
     * @returns {void} 
     * @memberof IBizListViewController
     */
    public removeData(arg: any = {}): void {
        if (this.getParentMode()) {
            Object.assign(arg, this.getParentMode());
        }

        if (this.getParentData()) {
            Object.assign(arg, this.getParentData());
        }

        if (!arg.srfkeys) {
            // 获取要删除的数据集合
            const selectedData: any[] = this.getList().getSelection();
            if (!selectedData || selectedData == null || selectedData.length === 0) {
                return;
            }

            let keys = '';
            selectedData.forEach((record) => {
                let key = record.srfkey;
                if (!Object.is(keys, '')) {
                    keys += ';';
                }
                keys += key;
            });
            arg.srfkeys = keys;
        }

        let grid: any = this.getList();
        if (grid) {
            grid.remove(arg);
        }
    }

    /**
     * 批量添加数据
     * 
     * @param {any[]} selectedDatas 
     * @returns {void} 
     * @memberof IBizListViewController
     */
    public addDataBatch(selectedDatas: any[]): void {
        let arg: any = {};

        if (!selectedDatas || selectedDatas == null || selectedDatas.length === 0) {
            return;
        }

        Object.assign(arg, this.$viewParam);

        if (this.getParentMode()) {
            Object.assign(arg, this.getParentMode());
        }

        if (this.getParentData()) {
            Object.assign(arg, this.getParentData());
        }

        let keys = '';
        selectedDatas.forEach((record) => {
            let key = record.srfkey;
            if (!Object.is(keys, '')) {
                keys += ';';
            }
            keys += key;
        });
        arg.srfkeys = keys;
        let grid: any = this.getList();
        if (grid) {
            grid.addBatch(arg);
        }
    }

    /**
     * 编辑操作
     * 
     * @param {*} [params={}] 
     * @returns {void} 
     * @memberof IBizListViewController
     */
    public doEdit(params: any = {}): void {
        const gridCtrl: any = this.getList();
        if (!gridCtrl) {
            return;
        }
        // 获取要编辑的数据集合
        if (params && params.srfkey) {

            const param = gridCtrl.findItem('srfkey', params.srfkey);
            if (!param) {
                return;
            }
            const opt = { data: Object.assign(params, param) };
            this.onEditData(opt);
            return;
        }

        let selectedData = gridCtrl.getSelection();
        if (!selectedData || selectedData == null || selectedData.length === 0) {
            return;
        }

        let arg = { data: selectedData[0] };
        this.onEditData(arg);
    }

    /**
     * 实体界面行为参数
     *
     * @param {*} [uiaction={}] 实体界面行为
     * @returns {*}
     * @memberof IBizListViewController
     */
    public getBackendUIActionParam(uiaction: any = {}): any {
        if (Object.is(uiaction.actiontarget, 'SINGLEKEY') || Object.is(uiaction.actiontarget, 'MULTIKEY')) {
            let selectedData: any[] = this.getList().getSelection();
            if (!selectedData && selectedData == null || selectedData.length === 0) {
                return null;
            }

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

            let dataInfo = '';
            let keys = '';
            let firstOnly: boolean = Object.is(uiaction.actiontarget, 'SINGLEKEY');
            selectedData.some((record: any, index: number) => {
                let srfmajortext = record.srfmajortext;
                let key = record.srfkey;
                if (!Object.is(keys, '')) {
                    keys += ';';
                }

                keys += key;

                if (!Object.is(resultkeys, '')) {
                    resultkeys += ';';
                }
                if (!Object.is(resourcename, '') && record.hasOwnProperty(resourcename)) {
                    resultkeys += record[resourcename];
                }

                if (index < 5) {
                    if (!Object.is(dataInfo, '')) {
                        dataInfo += '、';
                    }
                    dataInfo += srfmajortext;
                }
                if (firstOnly) {
                    return true;
                }
                return false;
            });

            let arg: any = { srfkeys: keys, srfkey: keys, dataInfo };

            if (Object.keys(uiparamjo).length > 0) {
                Object.assign(arg, uiparamjo);
            }

            if (!Object.is(resultkeys, '')) {
                Object.assign(arg, { srfkeys: resultkeys, srfkey: resultkeys });
            }
            if (!Object.is(targetname, 'srfkey') && !Object.is(targetname, 'srfkeys')) {
                arg[targetname] = resultkeys;
            }

            return arg;
        }
        return {};
    }

    /**
     * 导出操作（Excel）
     * 
     * @param {*} params 
     * @memberof IBizListViewController
     */
    public doExportExcel(params: any): void {
        if (this.getMDCtrl()) {
            this.getMDCtrl().exportData(params);
        }
    }

    
    public goBack(arg: any = {}): void {

        this.$history.goBack();
    }

    public doDEUIAction(uiaction: any = {}, params: any = {}): void {
    
        if (Object.is(uiaction.tag, 'GoBack')) {
            this.goBack();
            return;
        }
        super.doDEUIAction(uiaction, params);
    
    }
}