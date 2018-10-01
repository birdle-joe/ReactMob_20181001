import React, { Component } from 'react';
import { Select, Spin } from 'antd';
import './ibiz-picker.less';
import { IBizHttp } from '../../service/IBizHttpService';
import { IBizNotification } from '../../util/IBizNotification';
import { IBizEditForm } from '../../widget/IBizEditForm';
import { IBizModal } from '../ibiz-modal/ibiz-modal';
import { Icon, List, Badge } from 'antd-mobile';

interface IBizPickerProps {
    /**
     * 表单项名称
     *
     * @type {string}
     * @memberof IBizPickerProps
     */
    name: string,
    /**
     * 选项值存放字段
     *
     * @type {string}
     * @memberof IBizPickerProps
     */
    valueItem?: string,
    /**
     * 表单部件实例
     *
     * @type {IBizEditForm}
     * @memberof IBizPickerProps
     */
    form: IBizEditForm,
    /**
     * 异步加载的组件
     *
     * @type {Function}
     * @memberof IBizPickerProps
     */
    asycnComImp?: () => any,
    /**
     * 是否启用
     *
     * @type {boolean}
     * @memberof IBizPickerProps
     */
    disabled?: boolean,
    /**
     * 数据选择类型
     *
     * @type {string}
     * @memberof IBizPickerProps
     */
    type?: 'NO_AC' | 'NO_BUTTON' | 'TRIGGER' | 'AC' | 'AC_NOBUTTON' | 'AC_FS_NOBUTTON' | 'AC_FS',
    /**
     * 默认提示信息
     *
     * @type {string}
     * @memberof IBizPickerProps
     */
    placeholder?: string
}

export class IBizPicker extends Component<IBizPickerProps> {
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
     * @memberof IBizPicker
     */
    public componentWillReceiveProps(nextProps): void {
        const { form, type } = nextProps;
        if (form) {
            if (Object.is(type, 'AC') || Object.is(type, 'AC_NOBUTTON') || Object.is(type, 'AC_FS_NOBUTTON') || Object.is(type, 'AC_FS')) {
                const textItem = form.findFormItem(this.props.name);
                if (textItem) {
                    const text = textItem.getValue();
                    if (text && !Object.is(text, '')) {
                        this.$values = [{ label: text }];
                    }
                }
            } else {
                const textItem = form.findFormItem(this.props.name);
                const valItem = form.findFormItem(this.props.valueItem);
                if (textItem && valItem) {
                    const value = valItem.getValue();
                    const text = textItem.getValue();
                    if (text && value && !Object.is(text, '') && !Object.is(value, '')) {
                        this.$values = [{ key: value, label: text }];
                    }
                }
            }
        }
    }

    /**
     * 选中值改变
     *
     * @memberof IBizPicker
     */
    public onChange = (item: any) => {
        const { form, type, name, valueItem } = this.props
        if (form) {
            if (Object.is(type, 'AC') || Object.is(type, 'AC_NOBUTTON') || Object.is(type, 'AC_FS_NOBUTTON') || Object.is(type, 'AC_FS')) {
                const textItem = form.findFormItem(name);
                if (textItem) {
                    if (item) {
                        this.$values = [];
                        this.$values = [item];
                        textItem.setValue(item.label);
                    } else {
                        this.$values = [];
                        textItem.setValue('');
                    }
                    this.tick();
                }
            } else {
                const textItem = form.findFormItem(name);
                const valItem = form.findFormItem(`${valueItem}`);
                if (textItem && valItem) {
                    if (item) {
                        this.$values = [];
                        this.$values = [item];
                        textItem.setValue(item.label);
                        valItem.setValue(item.key);
                    } else {
                        this.$values = [];
                        textItem.setValue('');
                        valItem.setValue('');
                    }
                    this.tick();
                }
            }
        }
    }

    /**
     * 搜索数据
     *
     * @memberof IBizPicker
     */
    public search = (val: string = '') => {
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
                    this.tick();
                } else {
                    IBizNotification.error('错误', res.errorMessage);
                }
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
        const { asycnComImp, form, name, valueItem } = this.props;
        if (asycnComImp && form) {
            const textItem = form.findFormItem(name);
            const valItem = form.findFormItem(`${valueItem}`);
            this.$ibizModal.openModal(asycnComImp, { 'oldSelected': [{ srfkey: valItem ? valItem.getValue() : '', srfmajortext: textItem ? textItem.getValue() : '' }] }).subscribe((res) => {
                if (res && Object.is(res.ret, 'OK') && res.data.selected) {
                    const item: any = res.data.selected[0];
                    this.$values = [{ key: item.srfkey, label: item.srfmajortext }];
                    textItem.setValue(item.srfmajortext);
                    // valItem.setValue(item.srfkey);
                }
                this.tick();
            });
        } else {
            IBizNotification.warning('警告', '未指定选择视图');
        }
    }

    /**
     * 绘制
     *
     * @returns
     * @memberof IBizPicker
     */
    public render() {
        // const { type, disabled, placeholder } = this.props;
        // let search: boolean = true;
        // let arrow: boolean = false;
        // if (Object.is(type, 'TRIGGER')  || Object.is(type, 'AC') || Object.is(type, 'AC_FS')) {
        //     arrow = true;
        // }
        // if (Object.is(type, 'AC_FS_NOBUTTON') || Object.is(type, 'AC_FS') || Object.is(type, 'NO_AC')) {
        //     search = false;
        // }

        const search = <Icon type="search" size={'xxs'} onClick={this.openPickupView} style={{float:"right"}}> </Icon>;

        let group;
        const items = this.$values;
        if (items) {
                group =items.map((item,index) => {

                return (
                
                     <Badge text={<div><span>{item.label}</span><Icon type="cross-circle" size={'xxs'} onClick={this.removeItem.bind(this)} > </Icon></div>} size="large"   key={index} ></Badge> 
            
                  ) ;
               
            });
        }


        return (



            <List.Item wrap><>{group}{search}</></List.Item>

            // <div style={{ position: 'relative' }}>
            //          <Select
            //             disabled={disabled}
            //             value={this.$values}
            //             labelInValue={true}
            //             showSearch={search}
            //             showArrow={arrow}
            //             allowClear={true}
            //             placeholder={placeholder ? placeholder : "请选择"}
            //             notFoundContent={this.$isLoading ? <Spin size="small" /> : null}
            //             filterOption={false}
            //             onSearch={this.search}
            //             onChange={this.onChange}
            //             onFocus={this.search}
            //             style={{ width: '100%' }} >
            //             {this.$items.map((d: any) => <Select.Option key={d.value}>{d.text}</Select.Option>)}
            //         </Select>
            //         {(Object.is(type, 'AC') || Object.is(type, 'AC_NOBUTTON') || Object.is(type, 'AC_FS_NOBUTTON') || Object.is(type, 'AC_FS') || Object.is(type, 'NO_BUTTON') || Object.is(type, 'TRIGGER') || disabled) ? null : <Icon type="search" className="search-icon" onClick={this.openPickupView} />} 
            //     </div> 
        );
    }


    public removeItem()
    {
        const { asycnComImp, form, name, valueItem } = this.props;
        if ( form) {
            const textItem = form.findFormItem(name);
            textItem.setValue('');
            this.$values=[];
            this.tick();
        }

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