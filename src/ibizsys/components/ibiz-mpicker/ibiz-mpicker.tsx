import React, { Component } from 'react';
import { Select, Spin, Icon } from 'antd';
import './ibiz-mpicker.less';
import { IBizHttp } from '../../service/IBizHttpService';
import { IBizNotification } from '../../util/IBizNotification';
import { IBizEditForm } from '../../widget/IBizEditForm';
import { IBizFormField } from '../../formitem/IBizFormField';
import { IBizModal } from '../ibiz-modal/ibiz-modal';

interface IBizPickerProps {
    /**
     * 表单项名称
     *
     * @type {string}
     * @memberof IBizPickerProps
     */
    name: string,
    /**
     * 表单部件控制器
     *
     * @type {IBizEditForm}
     * @memberof IBizPickerProps
     */
    form: IBizEditForm,
    /**
     * 是否启用
     *
     * @type {boolean}
     * @memberof IBizPickerProps
     */
    disabled?: boolean,
    /**
     * 异步引用组件,例: () => import('@pages/base-test/book-class-pickup-view/book-class-pickup-view');
     *
     * @type {Function}
     * @memberof IBizPickerProps
     */
    asycnComImp: () => any,
    /**
     * 默认提示信息
     *
     * @type {string}
     * @memberof IBizPickerProps
     */
    placeholder?: string
}

export class IBizMPicker extends Component<IBizPickerProps> {
    /**
     * http请求对象
     *
     * @private
     * @memberof IBizPicker
     */
    private $http = IBizHttp.getInstance();
    /**
     * 是否正在加载数据
     *
     * @private
     * @type {boolean}
     * @memberof IBizPicker
     */
    private $isLoading: boolean = false;
    /**
     * 选中数据
     *
     * @private
     * @type {*}
     * @memberof IBizPicker
     */
    private $values: any[] = [];
    /**
     * 可选择数据
     *
     * @private
     * @type {any[]}
     * @memberof IBizPicker
     */
    private $items: any[] = [];
    /**
     * 延迟搜索定时器
     *
     * @private
     * @type {*}
     * @memberof IBizPicker
     */
    private $timer: any;
    /**
     * 模态框对象
     *
     * @private
     * @type {IBizModal}
     * @memberof IBizMPicker
     */
    private $ibizModal: IBizModal = new IBizModal();

    constructor(props) {
        super(props);
    }

    /**
     * 监测输入属性变化
     *
     * @param {*} nextProps
     * @memberof IBizMPicker
     */
    public componentWillReceiveProps(nextProps): void {
        const { form } = nextProps;
        if (form) {
            const vals: IBizFormField = form.findFormItem(this.props.name);
            let items: any = vals.getValue();
            this.$values = [];
            if (typeof (items) === 'string' && !Object.is(items, '')) {
                try {
                    items = JSON.parse(items);
                } catch (error) {
                    console.error(error);
                }
            }
            if (items && Array.isArray(items)) {
                items.forEach((item) => {
                    this.$values.push({
                        key: item.srfkey,
                        label: item.srfmajortext
                    })
                });
            }
        }
    }

    /**
     * 选中值改变
     *
     * @memberof IBizPicker
     */
    private onChange = (items: any = []) => {
        this.$values = items;
        this.changeFormData(items);
        this.tick();
    }

    /**
     * 获取焦点时搜索
     *
     * @memberof IBizMPicker
     */
    private onFocus = () => {
        if (this.$values.length === 0) {
            this.search('');
        }
    }

    /**
     * 搜索数据
     *
     * @memberof IBizPicker
     */
    private search = (val: string = '') => {
        const { disabled } = this.props;
        if (disabled) {
            return;
        }
        if (!this.props.form) {
            return;
        }
        if (this.$timer) {
            clearTimeout(this.$timer);
            this.$timer = null;
        }
        if (val.trim().length === 0) {
            return;
        }
        const { form } = this.props;
        this.$timer = setTimeout(() => {
            const param: any = { srfaction: 'itemfetch', srfreferitem: this.props.name, query: val, srfreferdata: form.getFormData() };
            const url: string = `${form.getBackendUrl()}?SRFCTRLID=${form.getName()}&SRFFORMITEMID=${this.props.name}`;

            this.$isLoading = true;
            this.tick();

            this.$http.post2(url, param).then((res) => {
                this.$isLoading = false;
                if (res && res.ret === 0) {
                    this.$items = res.items;
                } else {
                    IBizNotification.error('错误', res.errorMessage);
                }
                this.tick();
            }).catch((err) => {
                this.$isLoading = false;
                this.tick();
                console.error('picker请求数据错误:', err);
            });
        }, 500);
    }

    /**
     * 打开选择视图
     *
     * @private
     * @memberof IBizMPicker
     */
    private openPickupView = (): void => {
        const { asycnComImp, form } = this.props;
        if (asycnComImp && form) {
            const vals: IBizFormField = form.findFormItem(this.props.name);
            let items: any = vals.getValue();
            if (typeof (items) === 'string' && !Object.is(items, '')) {
                try {
                    items = JSON.parse(items);
                } catch (error) {
                    console.error(error);
                }
            }
            this.$ibizModal.openModal(asycnComImp, { 'oldSelected': items }).subscribe((res) => {
                if (res && Object.is(res.ret, 'OK') && res.data.selected) {
                    const selectedItems: any[] = res.data.selected;
                    this.$values = [];
                    selectedItems.forEach((item) => {
                        this.$values.push({
                            key: item.srfkey,
                            label: item.srfmajortext
                        });
                    });
                    this.changeFormData(this.$values);
                }
                this.tick();
            });
        } else {
            IBizNotification.warning('警告', '未指定选择视图');
        }
    }

    /**
     * 改变表单数据
     *
     * @private
     * @param {any[]} items
     * @memberof IBizMPicker
     */
    private changeFormData(items: any[]): void {
        const vals: any[] = [];
        items.forEach((item) => {
            vals.push({
                srfmajortext: item.label,
                srfkey: item.key
            });
        });
        const { form } = this.props;
        if (form) {
            const textItem: IBizFormField = form.findFormItem(this.props.name);
            textItem.setValue(vals);
        }
    }

    /**
     * 绘制
     *
     * @returns
     * @memberof IBizPicker
     */
    public render() {
        const { disabled, placeholder } = this.props;
        return (
            <div style={{ position: 'relative' }}>
                <Select
                    disabled={disabled ? true : false}
                    mode="multiple"
                    value={this.$values}
                    labelInValue={true}
                    allowClear={true}
                    placeholder={placeholder ? placeholder : "请选择"}
                    notFoundContent={this.$isLoading ? <Spin size="small" /> : null}
                    filterOption={false}
                    onSearch={this.search}
                    onChange={this.onChange}
                    onFocus={this.onFocus}
                    style={{ width: '100%' }} >
                    {this.$items.map((d: any) => <Select.Option key={d.value}>{d.text}</Select.Option>)}
                </Select>
                {disabled ? null : <Icon type="search" className="search-icon" onClick={this.openPickupView} />}
            </div>
        );
    }

    /**
     * 变更检测
     *
     * @private
     * @memberof IBizPicker
     */
    private tick(): void {
        this.setState({
            date: new Date()
        });
    }

} 