import { IBizObject } from "../IBizObject";
import { Subject, Observable } from "rxjs";

/**
 * 表单属性对象<主要管理属性及其标签的值、可用、显示、必填等操作>
 * 
 * @export
 * @class IBizFormItem
 * @extends {IBizObject}
 */
export class IBizFormItem extends IBizObject {

    /**
     * 表单项类型
     * 
     * @private
     * @type {string}
     * @memberof IBizField
     */
    private $type: string;

    /**
     * 表单对象
     * 
     * @private
     * @type {*}
     * @memberof IBizField
     */
    public $form: any;

    /**
     * 表单项的值
     * 
     * @private
     * @type {string}
     * @memberof IBizField
     */
    protected $value: string;

    /**
     * 旧值
     *
     * @protected
     * @type {string}
     * @memberof IBizFormItem
     */
    protected $oldValue: string;

    /**
     * 表单项名称
     * 
     * @type {string}
     * @memberof IBizField
     */
    private $name: string;

    /**
     * 标题
     *
     * @private
     * @type {string}
     * @memberof IBizField
     */
    private $caption: string;

    /**
     * 表单项是否禁用
     * 
     * @private
     * @type {boolean}
     * @memberof IBizField
     */
    public disabled: boolean;

    /**
     * 是否可见
     * 
     * @type {boolean}
     * @memberof IBizField
     */
    public visible: boolean;

    /**
     * 是否是必填
     * 
     * @type {boolean}
     * @memberof IBizField
     */
    public allowEmpty: boolean;

    /**
     * 是否有错误信息
     * 
     * @type {boolean}
     * @memberof IBizField
     */
    public hasError: boolean = false;

    /**
     * 表单项校验状态
     * 
     * @type {string}
     * @memberof IBizField
     */
    public validateStatus: string = 'success';

    /**
     * 表单校验错误信息
     * 
     * @type {string}
     * @memberof IBizField
     */
    public errorInfo: string = '';

    /**
     * 属性动态配置值<代码表>
     *
     * @type {any[]}
     * @memberof IBizField
     */
    public config: any[] = [];

    /**
     * 值改变流
     *
     * @protected
     * @type {Subject<any>}
     * @memberof IBizFormItem
     */
    protected subject: Subject<any> = new Subject();

    /**
     * 表单项绘制内容
     *
     * @private
     * @memberof IBizField
     */
    public $render;

    /**
     * Creates an instance of IBizFormItem.
     * 创建 IBizFormItem 实例
     * 
     * @param {*} [opts={}] 
     * @memberof IBizFormItem
     */
    constructor(opts: any = {}) {
        super({}, {}, opts);
        this.$type = opts.type;
        this.$form = opts.form;
        this.$name = opts.name;
        this.$caption = opts.caption;
        this.disabled = opts.disabled;
        this.visible = opts.visible ? true : false;;
        this.allowEmpty = opts.allowEmpty ? true : false;
        this.$render = opts.render;
    }

    /**
     * 设置值
     * 
     * @memberof IBizField
     */
    set value(val) {
        this.$value = val;
        if (this.$oldValue !== this.$value) {
            this.subject.next({ name: this.getName(), oldValue: this.$oldValue, value: this.$value });
            this.$oldValue = this.$value;
            this.tick();
        }
    }

    /**
     * 获取值
     * 
     * @type {string}
     * @memberof IBizField
     */
    get value(): string {
        return this.$value ? this.$value : '';
    }

    /**
     * 获取表单项类型
     * 
     * @returns {string} 
     * @memberof IBizField
     */
    public getType(): string {
        return this.$type;
    }

    /**
     * 设置表单对象
     * 
     * @param {*} form 
     * @memberof IBizField
     */
    public setForm(form: any): void {
        this.$form = form;
    }

    /**
     * 获取表单对象
     * 
     * @returns {*} 
     * @memberof IBizField
     */
    public getForm(): any {
        return this.$form;
    }

    /**
     * 获取值
     * 
     * @returns {*} 
     * @memberof IBizField
     */
    public getValue(): any {
        return this.value;
    }

    /**
     * 设置值
     * 
     * @param {any} value 
     * @memberof IBizField
     */
    public setValue(value: any): void {
        this.value = value;
    }

    /**
     * 获取属性名
     * 
     * @returns {string} 
     * @memberof IBizField
     */
    public getName(): string {
        return this.$name;
    }

    /**
     * 获取标题
     *
     * @returns {string}
     * @memberof IBizField
     */
    public getCaption(): string {
        return this.$caption;
    }

    /**
     * 是否启用
     * 
     * @returns {boolean} 
     * @memberof IBizField
     */
    public isDisabled(): boolean {
        return this.disabled;
    }

    /**
     * 设置是否启用
     * 
     * @param {boolean} disabled 
     * @memberof IBizField
     */
    public setDisabled(disabled: boolean): void {
        this.disabled = disabled;
    }

    /**
     * 设置可见性
     * 
     * @param {boolean} visible 
     * @memberof IBizField
     */
    public setVisible(visible: boolean): void {
        this.visible = visible;
    }

    /**
     * 设置属性动态配置
     *
     * @param {any[]} config 代码表
     * @memberof IBizField
     */
    public setAsyncConfig(config: any[]): void {
        if (Array.isArray(config)) {
            this.config = [...config];
        }
    }

    /**
     * 设置只读<Ext版本方法禁止使用>
     * 
     * @param {boolean} readonly 
     * @memberof IBizField
     */
    public setReadOnly(readonly: boolean): void {
        this.setDisabled(readonly);
    }

    /**
     * 编辑是否必须输入
     * 
     * @param {boolean} allowblank 
     * @memberof IBizField
     */
    public setAllowBlank(allowblank: boolean): void {
    }

    /**
     * 标记表单项值无效提示
     * 
     * @param {*} info 
     * @memberof IBizField
     */
    public markInvalid(info: any): void {
    }

    /**
     * 设置表单项错误
     * 
     * @param {*} info 
     * @memberof IBizField
     */
    public setActiveError(info: any): void {
        this.markInvalid(info);
    }

    /**
     * 表单项是否有错误
     * 
     * @returns {boolean} 
     * @memberof IBizField
     */
    public hasActiveError(): boolean {
        return this.hasError;
    }

    /**
     * 重置表单项错误
     * 
     * @memberof IBizField
     */
    public unsetActiveError(): void {
        this.hasError = false;
    }

    /**
     * 值变化
     * 
     * @memberof IBizField
     */
    public onValueChange(): Observable<{name: string, oldValue: string, value: string}> {
        return this.subject.asObservable();
    }

    /**
     * 输入框失去焦点触发
     * 
     * @param {*} $event 
     * @memberof IBizField
     */
    public onBlur = ($event: any): void => {
        if (!$event) {
            return;
        }
        this.value = $event.target.value;
    }

    /**
     * 键盘事件
     *
     * @param {*} $event
     * @returns {void}
     * @memberof IBizField
     */
    public onKeydown = ($event: any): void => {
        if (!$event) {
            return;
        }
        if ($event.keyCode !== 13) {
            return;
        }
        this.value = $event.target.value;
    }

    /**
     * 表单项值发生变化
     *
     * @param {*} value 变更后的值,或者为react事件
     * @memberof IBizField
     */
    public onChange = (value: any): void => {
        this.value = value;
    }

    /**
     * 值改变，从target中取值
     *
     * @memberof IBizFormItem
     */
    public onChangeForTarget = ({ target }): void => {
        if (target) {
            this.value = target.value;
        }
    }

    /**
     * 设置表单项错误信息
     * 
     * @param {*} [info={}] 
     * @memberof IBizField
     */
    public setErrorInfo(info: any = {}): void {
        this.validateStatus = info.validateStatus;
        this.hasError = info.hasError;
        this.errorInfo = info.errorInfo;
    }

    /**
     * 内容绘制
     *
     * @memberof IBizField
     */
    public render() {
        if (this.$render && this.$render instanceof Function) {
            return this.$render(this);
        }
        return;
    }

    /**
     * 变更检测
     *
     * @protected
     * @memberof IBizField
     */
    protected tick(): void {
        if (this.$form) {
            this.$form.tick();
        }
    }

}