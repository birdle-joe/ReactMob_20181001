import React from 'react';
import { Form, Card   } from 'antd';
import { Subject, Observable } from 'rxjs';
import { IBizControl } from './IBizControl';
import { IBizEvent } from '../IBizEvent';
import { List,Button, Flex, TextareaItem, WhiteSpace } from 'antd-mobile';
import { Tabs  } from 'antd';
// import {Tabs } from 'antd-mobile';

/**
 * 表单部件服务对象
 * 
 * @export
 * @class IBizFormControl
 * @extends {IBizControl}
 */
export class IBizFormControl extends IBizControl {

    /**
     * 是否忽略表单变化
     * 
     * @type {boolean}
     * @memberof IBizFormControl
     */
    public $ignoreformitemchange: boolean = false;

    /**
     * 是否忽略表单项更新
     * 
     * @type {boolean}
     * @memberof IBizFormControl
     */
    public $ignoreUFI: boolean = false;

    /**
     * 当前表单权限
     * 
     * @type {*}
     * @memberof IBizFormControl
     */
    public $dataaccaction: any = {};

    /**
     * 表单是否改变
     * 
     * @type {boolean}
     * @memberof IBizFormControl
     */
    public $formDirty: boolean = false;

    /**
     * 表单表单项
     * 
     * @type {*}
     * @memberof IBizFormControl
     */
    public $items: any = {};

    /**
     * Creates an instance of IBizFormControl.
     * @param {*} props
     * @param {*} context
     * @param {*} [opts={}]
     * @memberof IBizFormControl
     */
    constructor(props: any, context: any, opts: any = {}) {
        super(props, context, opts);
        this.regFormItems();
    }

    /**
     * 注册表单项
     * 
     * @memberof IBizFormControl
     */
    public regFormItems(): void { }

    /**
     * 表单加载
     * 
     * @param {*} [arg={}] 参数
     * @returns {void} 
     * @memberof IBizFormControl
     */
    public autoLoad(arg: any = {}): void {
        if (arg.srfkey !== undefined && arg.srfkey !== '') {
            this.load2(arg);
            return;
        }
        if (arg.srfkeys !== undefined && arg.srfkeys !== '') {
            arg.srfkey = arg.srfkeys;
            this.load2(arg);
            return;
        }
        this.loadDraft(arg);
    }

    /**
     * 加载
     * 
     * @param {*} [opt={}] 参数
     * @memberof IBizFormControl
     */
    public load2(opt: any = {}): void {
        let arg: any = {};
        Object.assign(arg, opt);

        Object.assign(arg, { srfaction: 'load', srfctrlid: this.getName() });
        this.fire(IBizEvent.IBizForm_BEFORELOAD, arg);

        this.$ignoreUFI = true;
        this.$ignoreformitemchange = true;
        this.load(arg).subscribe((action) => {
            this.setItemAsyncConfig(action.config);
            this.setItemState(action.state);
            this.setDataAccAction(action.$dataaccaction);
            this.fillForm(action.data);
            this.$formDirty = false;
            this.fire(IBizEvent.IBizForm_FORMLOADED, this);
            this.$ignoreUFI = false;
            this.$ignoreformitemchange = false;
            this.fire(IBizEvent.IBizForm_FORMFIELDCHANGED, null);
            this.onLoaded();
            this.tick();
        }, (action) => {
            // action.failureType = 'SERVER_INVALID';
            this.showToast(this.$showErrorToast, '加载失败', '加载数据发生错误, ' + this.getActionErrorInfo(action));
            this.$ignoreUFI = false;
            this.$ignoreformitemchange = false;
        });
    }

    /**
     * 加载草稿
     * 
     * @param {*} [opt={}] 
     * @memberof IBizFormControl
     */
    public loadDraft(opt: any = {}): void {
        let arg: any = {};
        Object.assign(arg, opt);

        this.$ignoreUFI = true;
        this.$ignoreformitemchange = true;

        if (!arg.srfsourcekey || arg.srfsourcekey === '') {
            Object.assign(arg, { srfaction: 'loaddraft', srfctrlid: this.getName() })

        } else {
            Object.assign(arg, { srfaction: 'loaddraftfrom', srfctrlid: this.getName() })
        }

        this.load(arg).subscribe((action) => {
            this.setItemAsyncConfig(action.config);
            this.setItemState(action.state);
            this.setDataAccAction(action.$dataaccaction);
            this.fillForm(action.data);
            this.$formDirty = false;
            this.fire(IBizEvent.IBizForm_FORMLOADED, this);
            this.$ignoreUFI = false;
            this.$ignoreformitemchange = false;
            this.fire(IBizEvent.IBizForm_FORMFIELDCHANGED, null);
            this.onDraftLoaded();
            this.tick();
        }, (action) => {
            this.showToast(this.$showErrorToast, '加载失败', '加载草稿发生错误, ' + this.getActionErrorInfo(action));
            this.$ignoreUFI = false;
            this.$ignoreformitemchange = false;
        });
    }

    /**
     * 
     * 
     * @memberof IBizFormControl
     */
    public onDraftLoaded(): void {

    }

    /**
     * 
     * 
     * @memberof IBizFormControl
     */
    public onLoaded(): void {

    }

    /**
     * 设置表单动态配置
     * 
     * @param {*} [config={}] 
     * @memberof IBizFormControl
     */
    public setItemAsyncConfig(config: any = {}): void {
        const _names: any[] = Object.keys(config);
        _names.forEach((name) => {
            const item = this.findFormItem(name);
            if (item && Array.isArray(config[name].items)) {
                item.setAsyncConfig(config[name].items);
            }
        });
    }

    /**
     * 设置当前表单权限信息
     * 
     * @param {*} [dataaccaction={}] 权限数据
     * @memberof IBizFormControl
     */
    public setDataAccAction(dataaccaction: any = {}): void {
        this.$dataaccaction = dataaccaction;
        this.fire(IBizEvent.IBizForm_DATAACCACTIONCHANGE, this);
    }

    /**
     * 获取当前表单权限信息
     * 
     * @returns {*} 
     * @memberof IBizFormControl
     */
    public getdataaccaction(): any {
        return this.$dataaccaction;
    }

    /**
     * 设置属性状态
     * 
     * @param {*} [state={}] 
     * @memberof IBizFormControl
     */
    public setItemState(state: any = {}): void {
        if (state === undefined || state == null) {
            return;
        }

        const stateDats: any[] = Object.keys(state);
        stateDats.forEach(name => {
            const item = this.findFormItem(name);
            if (item) {
                const disabled = ((state[name] & 1) === 0);
                if (item.isDisabled() !== disabled) {
                    item.setDisabled(disabled);
                }
            }
        });
    }

    /**
     * 表单是否改变
     * 
     * @returns {boolean} 
     * @memberof IBizFormControl
     */
    public isDirty(): boolean {
        return this.$formDirty;
    }

    /**
     * 注册表单属性
     * 
     * @param {*} item 表单项
     * @memberof IBizFormControl
     */
    public regFormItem(item: any): void {
        if (item) {
            item.onValueChange().subscribe((data) => {
                if (this.$ignoreformitemchange) {
                    return;
                }
                this.$formDirty = true;
                this.fire(IBizEvent.IBizForm_FORMFIELDCHANGED, data);
            });
            this.$items[item.getName()] = item;
        }
    }

    /**
     * 注销表单属性
     * 
     * @param {*} item 属性
     * @memberof IBizFormControl
     */
    public unRegFiled(item: any): void {
        delete this.$items[item.getName()];
    }

    /**
     * 获取控件标识
     * 
     * @returns {*} 
     * @memberof IBizFormControl
     */
    public getSRFCtrlId(): any {
        // return this.srfctrlid;
    }

    /**
     * 根据名称获取属性
     * 
     * @param {string} name 属性名称
     * @returns {*} 
     * @memberof IBizFormControl
     */
    public findFormItem(name: string): any {
        if (this.$items[name]) {
            return this.$items[name];
        }
        return undefined;
    }

    /**
     * 加载数据
     * 
     * @param {*} [opt={}] 参数
     * @returns {Observable<any>}  事件回调
     * @memberof IBizFormControl
     */
    public load(opt: any = {}): Observable<any> {
        let arg: any = {};
        Object.assign(arg, opt);
        let subject = new Subject();
        this.post(arg).subscribe((data) => {
            if (data && data.ret === 0) {
                subject.next(data);
            } else {
                subject.error(data);
            }
        }, (data) => {
            subject.error(data);
        });
        return subject;
    }

    /**
     * 数据提交
     * 
     * @param {*} [opt={}] 参数
     * @returns {Observable<any>} 事件回调
     * @memberof IBizFormControl
     */
    public submit(opt: any = {}): Observable<any> {
        let arg: any = {};
        Object.assign(arg, opt);
        let subject = new Subject();
        this.post(arg).subscribe((data) => {
            if (data.ret === 0) {
                subject.next(data);
            } else {
                subject.error(data);
            }
        }, (data) => {
            subject.error(data);
        });
        return subject;
    }

    /**
     * 返回错误提示信息
     * 
     * @param {*} [action={}] 
     * @returns {string} 
     * @memberof IBizFormControl
     */
    public getActionErrorInfo(action: any = {}): string {
        if (action.failureType === 'CONNECT_FAILURE') {
            return 'Status:' + action.response.status + ': ' + action.response.statusText;
        }
        if (action.failureType === 'SERVER_INVALID') {
            let msg: string = '';
            if (action.errorMessage) {
                // msg = '</br>' + action.errorMessage.replace('\n', '</br>');
                msg = action.errorMessage;
            }
            if (action.error && action.error.items) {
                const items: any[] = action.error.items;
                items.forEach((item, index) => {
                    if (index >= 5) {
                        // msg += ('<BR>...... ');
                        msg += ('...... ');
                    }
                    if (item.info && item.info !== '' && msg.indexOf(item.info) < 0) {
                        // msg += ('<BR>' + item.info);
                        msg += item.info;
                    }
                });
            }
            return msg;
        }
        if (action.failureType === 'CLIENT_INVALID') {
            return '';
        }
        if (action.failureType === 'LOAD_FAILURE') {
            return '';
        }
        return '';
    }

    /**
     * 填充表单
     * 
     * @param {*} [data={}] 
     * @memberof IBizFormControl
     */
    public fillForm(data: any = {}): void {
        let fillDatas: any[] = Object.keys(data);
        fillDatas.forEach((name) => {
            const item = this.findFormItem(name);
            if (item) {
                const _value = data[name];
                item.setValue(_value);
            }
        });
    }

    /**
     * 设置表单项值
     * 
     * @param {string} name 
     * @param {*} value 
     * @memberof IBizFormControl
     */
    public setFieldValue(name: string, value: any): void {
        const item = this.findFormItem(name);
        if (item) {
            item.setValue(value);
        }
    }

    /**
     * 获取表单项值
     * 
     * @param {string} name 
     * @returns {*} 
     * @memberof IBizFormControl
     */
    public getFieldValue(name: string): any {
        const item = this.findFormItem(name);
        if (!item) {
            this.showToast(this.$showErrorToast, '获取失败', '无法获取表单项[' + name + ']');
            return '';
        }
        return item.getValue();
    }

    /**
     * 设置表单项允许为空
     * 
     * @param {string} name 
     * @param {boolean} allowblank 
     * @memberof IBizFormControl
     */
    public setFieldAllowBlank(name: string, allowblank: boolean): void {
        const item = this.findFormItem(name);
        if (item) {
            item.setAllowBlank(allowblank);
        }
    }

    /**
     * 设置表单项属性是否禁用
     * 
     * @param {string} name 
     * @param {boolean} disabled 
     * @memberof IBizFormControl
     */
    public setFieldDisabled(name: string, disabled: boolean): void {
        const item = this.findFormItem(name);
        if (item) {
            item.setDisabled(disabled);
        }
    }

    /**
     * 设置表单错误
     * 
     * @param {any} formerror 
     * @memberof IBizFormControl
     */
    public setFormError(formerror: any): void {
        this.resetFormError();
        if (formerror && formerror.items) {
            const errorItems: any[] = formerror.items;
            errorItems.forEach(item => {
                const name: string = item.id;
                if (name) {
                    const _item: any = this.$items[name];
                    _item.setErrorInfo({ validateStatus: 'error', hasError: true, errorInfo: item.info });
                }
            });
        }
    }

    /**
     * 
     * 
     * @memberof IBizFormControl
     */
    public resetFormError(): void {
        const itemsData: any[] = Object.keys(this.$items);
        itemsData.forEach(name => {
            const item = this.$items[name];
            item.setErrorInfo({ validateStatus: 'success', hasError: false, errorInfo: '' });
        });
    }

    /**
     * 设置面板,表单项<分组、分页面板>隐藏
     * 
     * @param {string} name 
     * @param {boolean} visible 
     * @memberof IBizFormControl
     */
    public setPanelVisible(name: string, visible: boolean): void {
        const item = this.findFormItem(name);
        if (item) {
            item.setVisible(visible);
        }
    }

    /**
     * 获取全部表单项值(排除值长度大于1000的表单项)
     * 
     * @returns {*} 
     * @memberof IBizFormControl
     */
    public getActiveData = (): any => {
        let values = {};
        const items: any[] = Object.keys(this.$items);
        items.forEach(name => {
            const item = this.findFormItem(name);
            if (item && (Object.is(item.getType(), 'FORMITEM') || Object.is(item.getType(), 'HIDDENFORMITEM'))) {
                const value = item.getValue();
                if (Object.keys(values).length <= 1000) {
                    values[name] = value;
                }
            }
        });
        return values;
    }

    /**
     * 获取全部表单项值(排除值长度大于1000的表单项)
     * 
     * @returns {*} 
     * @memberof IBizFormControl
     */
    public getFormData = () => {
        return this.getActiveData();
    }

    /**
     * 获取全部表单项值
     * 
     * @returns {*} 
     * @memberof IBizFormService
     */
    public getValues(): any {
        let values = {};
        const items: any[] = Object.keys(this.$items);
        items.forEach(name => {
            const field = this.findFormItem(name);
            if (field && (Object.is(field.getType(), 'FORMITEM') || Object.is(field.getType(), 'HIDDENFORMITEM'))) {
                const value = field.getValue();
                values[name] = value;
            }
        });
        return values;
    }

    /**
     * 
     * 
     * @param {*} value 
     * @returns {boolean} 
     * @memberof IBizFormControl
     */
    public testFieldEnableReadonly(value: any): boolean {
        return false;
    }

    /**
     * 更新表单项
     * 
     * @param {string} mode 更新模式
     * @returns {void} 
     * @memberof IBizFormControl
     */
    public updateFormItems(mode: string): void {
        if (this.$ignoreUFI) {
            return;
        }
        const activeData = this.getActiveData();
        let arg: any = {};

        this.fire(IBizEvent.IBizForm_UPDATEFORMITEMBEFORE, activeData);

        Object.assign(arg, { srfaction: 'updateformitem', srfufimode: mode, srfactivedata: JSON.stringify(activeData), srfctrlid: this.getName() })
        this.$ignoreUFI = true;
        this.$ignoreformitemchange = true;
        this.load(arg).subscribe((action) => {
            this.fire(IBizEvent.IBizForm_UPDATEFORMITEMED, action.data);
            this.setItemAsyncConfig(action.config);
            this.setItemState(action.state);
            if (action.$dataaccaction) {
                this.setDataAccAction(action.$dataaccaction);
            }
            this.fillForm(action.data);
            this.$ignoreUFI = false;
            this.$ignoreformitemchange = false;
        }, (action) => {
            action.failureType = 'SERVER_INVALID';
            this.showToast(this.$showErrorToast, '更新失败', '更新表单项发生错误, ' + action.info)
            this.$ignoreUFI = false;
            this.$ignoreformitemchange = false;
        });
    }

    /**
     * 重置表单
     * 
     * @memberof IBizFormControl
     */
    public reset(): void {
        this.autoLoad();
    }

    /**
     * 获取表单类型
     * 
     * @returns {string} 
     * @memberof IBizFormControl
     */
    public getFormType(): string | undefined {
        return undefined;
    }

    /**
     * 
     * 
     * @param {string} itemName 
     * @param {boolean} state 
     * @param {string} errorInfo 
     * @memberof IBizFormControl
     */
    public setFormItemChecked(itemName: string, state: boolean, errorInfo: string): void {
        const item = this.findFormItem(itemName);
        if (item) {
            item.setErrorInfo({ validateStatus: state ? 'error' : 'success', hasError: state ? true : false, errorInfo: state ? errorInfo : '' });
        }
    }

    /**
     * 表单绘制
     *
     * @memberof IBizFormControl
     */
    public render() {
        let formContent;

        let tabs2 = [
            { title: 'one', sub: '1' },
            ];

        const keys: string[] = Object.keys(this.$items);
        formContent = keys.map((key: any) => {
            const item = this.$items[key];
            if (Object.is(item.getType(), 'FORMPAGE')) {
                // tabs2.push({title: item.$caption})
                return <div key={key}>{item.render()}</div>;
                // return item.render();
            }
            return <div key={key}/>;
        });
        return (
            <div className="ibiz-form">
                 <Form>
                     <WhiteSpace size="sm" />
                     <div key="formContent"> {formContent} </div>
                 </Form>
             </div>
                    //   <WhiteSpace size="lg" />
                    //  <Item><Flex wrap="wrap"><label>用户名：</label>{<TextareaItem  placeholder="auto focus in Alipay client"  data-seed="logId" />}</Flex></Item>
                    //  <Item><Flex wrap="wrap"><label>密码：</label>{<TextareaItem  placeholder="auto focus in Alipay client"  data-seed="logId" />}</Flex></Item>
                    //  <Item><Flex wrap="wrap"><label>性别：</label>男</Flex></Item>  
        );
    }
}