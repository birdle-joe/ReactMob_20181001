import React, { Component } from 'react';
import './ibiz-popover';
import { IBizHttp } from '../../service/IBizHttpService';
import { IBizEditForm } from '../../widget/IBizEditForm';
import { IBizModal } from '../ibiz-modal/ibiz-modal';
import { List, Popover, Checkbox } from 'antd-mobile';

interface IBizPopoverProps {
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

    config?: any

    onChange?: any

    value: any


}

export class IBizPopover extends Component<IBizPopoverProps> {
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
     * 键
     *
     * @private
     * @type {*}
     * @memberof IBizPicker
     */
    private $value: any;

    /**
     * 文本
     *
     * @private
     * @type {*}
     * @memberof IBizPopover
     */
    private $text: any;

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
        const { form } = nextProps;
        if (form) {
            const valueItem = form.findFormItem(this.props.name);

            let textfield = this.props.valueItem;
            let textItem;
            let textValue;
            if (textfield) {
                textItem = form.findFormItem(textfield);
                textValue = textItem.getValue();
            }
            if (valueItem) {
                const value = valueItem.getValue();
                this.$value = value;
                if (!textItem && !textValue && value) {
                    this.$text = this.getCodeListText(value);
                }
                else {
                    if(textValue){
                        this.$text = textValue;
                    }else{
                        this.$text ='请选择';
                    }
                    
                }
            }
        }
    }


    public getCodeListText(value: any) {
        const { config } = this.props;
        let text;
        if (value) {
            let flag = config.some((item) => {
                text = item.text;
                return item.value === value;
            })
            if (!flag) {
                text = "请选择";
            }
        }
        else {
            text = "请选择";
        }
        return text;
    }

    /**
     * 绘制
     *
     * @returns
     * @memberof IBizPicker
     */
    public render() {
        const { type, disabled, placeholder, config } = this.props;
        return (
            <Popover mask={true} visible={disabled}
                overlay={[
                    <div key='IBizPopover'>
                        <Popover.Item key={'IBizPopover'}>
                            <Checkbox.CheckboxItem key={'IBizPopover'} checked={this.$value === '' || typeof (this.$value) === "undefined" ? true : false} onChange={this.onselect.bind(this, '')}>请选择</Checkbox.CheckboxItem>
                        </Popover.Item>
                        {config.map((configItem) => {
                            return (
                                <Popover.Item key={configItem.value}>
                                    <Checkbox.CheckboxItem key={configItem.value} checked={configItem.value === this.$value} onChange={this.onselect.bind(this, configItem)}>{configItem.text}</Checkbox.CheckboxItem>
                                </Popover.Item>
                            )
                        })
                        }
                    </div>
                ]}
            >
                <List.Item ><div style={{ float: "right" }}><span style={{ marginRight: 10,fontSize:'17px' }}>{this.$text}</span><i className="fa fa-sort-desc"></i></div></List.Item>
            </Popover>
        );
    }
    public onselect = (item: any) => {

        if (item) {
            this.$value = item.value;
            this.$text = item.text;
        }
        else {
            this.$value = "";
            this.$text = "请选择";
        }

        this.changeFormData();
        this.tick();

    }

    private changeFormData = (): void => {

        const { form } = this.props;
        if (form) {
            const valueItem = form.findFormItem(this.props.name);
            valueItem.setValue(this.$value);

            let textfield = this.props.valueItem;
            if (textfield) {
                let textItem = form.findFormItem(textfield);
                textItem.setValue(this.$text);
            }
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