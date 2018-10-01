import { IBizFormControl } from "./IBizFormControl";
import { IBizEvent } from "../IBizEvent";

/**
 * 编辑表单控制器
 * 
 * @export
 * @class IBizEditForm
 * @extends {IBizFormControl}
 */
export class IBizEditForm extends IBizFormControl {

    /**
     * Creates an instance of IBizEditForm.
     * @param {*} props
     * @param {*} context
     * @param {*} [opts={}]
     * @memberof IBizEditForm
     */
    constructor(props: any, context: any, opts: any = {}) {
        super(props, context, opts);
    }

    /**
     * 数据保存
     * 
     * @param {*} [arg={}] 
     * @returns {void} 
     * @memberof IBizEditForm
     */
    public save2(opts: any = {}): void {

        // this.showToast(this.$showSuccessToast, '保存错误信息', '保存数据发生错误,');
        // this.showToast(this.$showWarningToast, '保存错误信息', '保存数据发生错误,');
        // this.showToast(this.$showInfoToast, '保存错误信息', '保存数据发生错误,');
        // this.showToast(this.$showBlankToast, '保存错误信息', '保存数据发生错误,');

        let arg: any = {};
        this.fire(IBizEvent.IBizEditForm_FORMBEFORESAVE, arg);
        Object.assign(arg, opts);
        // if (IBizApp_Data)
        //     arg.srfappdata = IBizApp_Data;
        const data = this.getValues();

        // $.extend(arg, data);
        Object.assign(arg, data);

        if (data.srfuf === '1') {
            // $.extend(arg, { srfaction: 'update' });
            Object.assign(arg, { srfaction: 'update', srfctrlid: this.getName() });
        } else {
            // $.extend(arg, { srfaction: 'create' });
            Object.assign(arg, { srfaction: 'create', srfctrlid: this.getName() });
        }


        // 获取所有Disabled数据
        // var disablevalues = {};
        // $.each(this.fieldMap, function (name, item) {
        //     if (item.isDisabled()) {
        //         if (disablevalues[item.name] == undefined) {
        //             disablevalues[item.name] = item.getValue();
        //         }
        //     }
        // });
        // $.extend(arg, disablevalues);

        arg.srfcancel = false;
        // this.fireEvent(IBizEditForm.FORMBEFORESAVE, this, arg);
        if (arg.srfcancel === true) {
            return;
        }
        delete arg.srfcancel;

        this.$ignoreUFI = true;
        this.$ignoreformitemchange = true;

        this.submit(arg).subscribe((action) => {
            this.resetFormError();
            this.setItemAsyncConfig(action.config);
            this.setItemState(action.state);
            this.setDataAccAction(action.dataaccaction);
            this.fillForm(action.data);
            this.$formDirty = false;
            // 判断是否有提示
            if (action.info && action.info !== '') {
                // IBiz.alert('', action.info, 1);
                this.showToast(this.$showInfoToast, '', action.info);
            }
            // this.fireEvent('formsaved', this, action);
            this.fire(IBizEvent.IBizForm_FORMSAVED, this);
            this.$ignoreUFI = false;
            this.$ignoreformitemchange = false;
            // this.fireEvent('formfieldchanged', null);
            this.fire(IBizEvent.IBizForm_FORMFIELDCHANGED, this);
            this.onSaved();
        }, (action) => {
            if (action.error) {
                this.setFormError(action.error);
            }

            this.$ignoreUFI = false;
            this.$ignoreformitemchange = false;

            // this.fireEvent(IBizEditForm.FORMSAVEERROR, this);
            this.fire(IBizEvent.IBizEditForm_FORMSAVEERROR, this);

            action.failureType = 'SERVER_INVALID';
            if (action.ret === 10) {
                // this.confirm('保存错误信息', '保存数据发生错误, ' + this.getActionErrorInfo(action) + ', 是否要重新加载数据？').then((result) => {
                //     if (result && Object.is(result, 'OK')) {
                //         this.reload();
                //     }
                // });
            }
            else {
                this.showToast(this.$showErrorToast, '保存错误信息', '保存数据发生错误,' + this.getActionErrorInfo(action));
            }
        });
    }

    /**
     * 
     * 
     * @memberof IBizEditForm
     */
    public onSaved(): void {

    }

    /**
     * 表单数据刷新
     * 
     * @memberof IBizEditForm
     */
    public reload(): void {

        let item = this.findFormItem('srfkey');
        let loadarg: any = {};
        if (item) {
            loadarg.srfkey = item.getValue();
            if (loadarg.srfkey.indexOf('SRFTEMPKEY:') === 0) {
                item = this.findFormItem('srforikey');
                if (item) {
                    loadarg.srfkey = item.getValue();
                }
            }
            const viewController = this.getViewController();
            if (viewController) {
                const viewParmams: any = viewController.getViewParam();
                if (!Object.is(loadarg.srfkey, viewParmams.srfkey)) {
                    loadarg.srfkey = viewParmams.srfkey;
                }
            }
        }
        this.autoLoad(loadarg);
    }

    /**
     * 
     * 
     * @param {any} arg 
     * @returns {void} 
     * @memberof IBizEditForm
     */
    public remove(arg): void {

        if (!arg) {
            arg = {};
        }

        // if (IBizApp_Data)
        //     arg.srfappdata = IBizApp_Data;
        if (!arg.srfkey) {
            const item = this.findFormItem('srfkey');
            if (item) {
                arg.srfkey = item.getValue();
            }
        }

        if (arg.srfkey === undefined || arg.srfkey == null || arg.srfkey === '') {
            this.showToast(this.$showErrorToast, '删除错误信息', '当前表单未加载数据！');
            return;
        }
        // $.extend(arg, { srfaction: 'remove' });
        Object.assign(arg, { srfaction: 'remove', srfctrlid: this.getName() });
        this.$ignoreUFI = true;

        this.load(arg).subscribe((action) => {
            this.setItemAsyncConfig(action.config);
            this.setItemState(action.state);
            // this.fireEvent(IBizForm.FORMREMOVED);
            this.fire(IBizEvent.IBizForm_FORMREMOVED, this);
        }, (action) => {
            action.failureType = 'SERVER_INVALID';
            this.showToast(this.$showErrorToast, '删除错误信息', '删除数据发生错误, ' + this.getActionErrorInfo(action));
            this.$ignoreUFI = false;
        });
    }

    /**
     * 
     * 
     * @param {*} [arg={}] 
     * @returns {void} 
     * @memberof IBizEditForm
     */
    public wfstart(arg: any = {}): void {

        if (!arg) {
            arg = {};
        }

        // if (IBizApp_Data)
        //     arg.srfappdata = IBizApp_Data;
        if (!arg.srfkey) {
            let item = this.findFormItem('srfkey');
            if (item) {
                arg.srfkey = item.getValue();
            }
            item = this.findFormItem('srforikey');
            if (item) {
                const v = item.getValue();
                if (v && v !== '') {
                    arg.srfkey = v;
                }
            }
        }
        if (arg.srfkey === undefined || arg.srfkey == null || arg.srfkey === '') {
            this.showToast(this.$showErrorToast, '启动流程错误信息', '当前表单未加载数据！');
            return;
        }

        // $.extend(arg, { srfaction: 'wfstart' });
        Object.assign(arg, { srfaction: 'wfstart', srfctrlid: this.getName() });
        this.$ignoreUFI = true;
        this.$ignoreformitemchange = true;

        this.post(arg).subscribe((action) => {
            if (action.ret !== 0) {
                action.failureType = 'SERVER_INVALID';
                this.showToast(this.$showErrorToast, '启动流程错误信息', '启动流程发生错误,' + this.getActionErrorInfo(action));
                this.$ignoreUFI = false;
                this.$ignoreformitemchange = false;
                return;
            }

            this.setItemAsyncConfig(action.config);
            this.setItemState(action.state);
            this.setDataAccAction(action.dataaccaction);
            this.fillForm(action.data);
            this.$formDirty = false;
            // this.fireEvent(IBizForm.FORMLOADED);
            // this.fireEvent(IBizForm.FORMWFSTARTED);
            this.fire(IBizEvent.IBizForm_FORMWFSTARTED, this);
            this.$ignoreUFI = false;
            this.$ignoreformitemchange = false;
            // this.fireEvent(IBizForm.FORMFIELDCHANGED, null);
            this.fire(IBizEvent.IBizForm_FORMFIELDCHANGED, this);
        }, (action) => {
            action.failureType = 'SERVER_INVALID';
            this.showToast(this.$showErrorToast, '启动流程错误信息', '启动流程发生错误,' + this.getActionErrorInfo(action));
            this.$ignoreUFI = false;
            this.$ignoreformitemchange = false;
        });
    }

    /**
     * 
     * 
     * @param {*} [arg={}] 
     * @returns {void} 
     * @memberof IBizEditForm
     */
    public wfsubmit(arg: any = {}): void {

        if (!arg) {
            arg = {};
        }

        // if (IBizApp_Data)
        //     arg.srfappdata = IBizApp_Data;

        const data = this.getValues();
        // $.extend(arg, data);
        Object.assign(arg, data);
        // $.extend(arg, { srfaction: 'wfsubmit' });
        Object.assign(arg, { srfaction: 'wfsubmit', srfctrlid: this.getName() });

        //        if (!arg.srfkey) {
        //            var item = this.findField('srfkey');
        //            if (item) {
        //                arg.srfkey = item.getValue();
        //            }
        //        }
        if (arg.srfkey === undefined || arg.srfkey == null || arg.srfkey === '') {
            this.showToast(this.$showErrorToast, '提交流程错误信息', '当前表单未加载数据！');
            return;
        }

        this.$ignoreUFI = true;
        this.$ignoreformitemchange = true;

        this.load(arg).subscribe((action) => {
            this.setItemAsyncConfig(action.config);
            this.setItemState(action.state);
            this.setDataAccAction(action.dataaccaction);
            this.fillForm(action.data);
            this.$formDirty = false;
            // this.fireEvent(IBizForm.FORMLOADED);
            // this.fireEvent(IBizForm.FORMWFSUBMITTED);
            this.fire(IBizEvent.IBizForm_FORMWFSUBMITTED, this);
            this.$ignoreUFI = false;
            this.$ignoreformitemchange = false;
            // this.fireEvent(IBizForm.FORMFIELDCHANGED, null);
            this.fire(IBizEvent.IBizForm_FORMFIELDCHANGED, null);
        }, (action) => {
            action.failureType = 'SERVER_INVALID';
            this.showToast(this.$showErrorToast, '提交流程错误信息', '工作流提交发生错误,' + this.getActionErrorInfo(action));
            this.$ignoreUFI = false;
            this.$ignoreformitemchange = false;
        });
    }

    /**
     * 
     * 
     * @param {*} [arg={}] 
     * @memberof IBizEditForm
     */
    public doUIAction(arg: any = {}): void {

        if (!arg) {
            arg = {};
        }
        // $.extend(arg, { srfaction: 'uiaction' });
        Object.assign(arg, { srfaction: 'uiaction', srfctrlid: this.getName() });
        // if (IBizApp_Data) {
        //     arg.srfappdata = IBizApp_Data;
        // }

        this.post(arg).subscribe((data) => {
            if (data.ret === 0) {
                // IBiz.processResultBefore(data);
                // this.fireEvent(IBizEditForm.UIACTIONFINISHED, this, data);
                this.fire(IBizEvent.IBizEditForm_UIACTIONFINISHED, data);
                if (data.reloadData) {
                    this.reload();
                }
                if (data.info && data.info !== '') {
                    // IBiz.alert('', data.info, 1);
                    this.showToast(this.$showInfoToast, '', data.info);
                }
                // IBiz.processResult(data);
            } else {
                this.showToast(this.$showErrorToast, '界面操作错误信息', '操作失败,' + data.errorMessage);
            }
        }, (error) => {
            this.showToast(this.$showErrorToast, '界面操作错误信息', '执行请求异常！');
        });

    }
    public getFormType(): string {
        return 'EDITFORM';
    }
}