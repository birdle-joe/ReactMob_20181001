import React, { Component } from 'react';
import moment from 'moment';
import { TimePicker } from 'antd';
import { List, DatePicker } from 'antd-mobile';
import './ibiz-date-picker.less';

interface IBizDatePickerProps {
    /**
     * 默认提示
     *
     * @type {string}
     * @memberof IBizDatePickerProps
     */
    placeholder?: string,
    /**
     * 是否禁用，默认不禁用
     *
     * @type {boolean}
     * @memberof IBizDatePickerProps
     */
    disabled?: boolean,
    /**
     * 日期格式
     *
     * @type {string}
     * @memberof IBizDatePickerProps
     */
    format?: string,
    /**
     * 默认值
     *
     * @type {string}
     * @memberof IBizDatePickerProps
     */
    value?: string,
    /**
     * 值改变
     *
     * @type {Function}
     * @memberof IBizDatePickerProps
     */
    onChange?: (val: any) => void,
    /**
     * 类型
     *
     * @type {('date' | 'time')}
     * @memberof IBizDatePickerProps
     */
    type?: 'date' | 'time'| 'all'
}

export class IBizDatePicker extends Component<IBizDatePickerProps> {
    /**
     * 时间格式
     *
     * @private
     * @type {string}
     * @memberof IBizDatePicker
     */
    private $format: string = 'YYYY-MM-DD HH:mm:ss';
    /**
     * 提示信息
     *
     * @private
     * @type {string}
     * @memberof IBizDatePicker
     */
    private $placeholder: string = '请选择';
    /**
     * 是否禁用
     *
     * @private
     * @type {boolean}
     * @memberof IBizDatePicker
     */
    private $disabled: boolean = false;
    /**
     * 默认值
     *
     * @private
     * @type {string}
     * @memberof IBizDatePicker
     */
    private $value: string;
    /**
     * 选择器类型
     *
     * @private
     * @type {('date' | 'time')}
     * @memberof IBizDatePicker
     */
    private $type: 'all' | 'date' | 'time' = 'all';

    constructor(props) {
        super(props);
    }

    public componentWillReceiveProps(nextProps): void {
        const { format, placeholder, disabled, value, type } = nextProps;
        if (format) { this.$format = format; }
        if (placeholder) { this.$placeholder = placeholder; }
        if (disabled !== undefined) { this.$disabled = disabled; }
        if (value) { this.$value = value; }
        if (type) { this.$type = type; }
    }

    /**
     * 日期发生变化回调
     *
     * @private
     * @memberof IBizDatePicker
     */

    private onChange = (date) => {


        let dateString = moment(date).format(this.$format);
        const { onChange } = this.props;
        if (onChange) {
            onChange(dateString);
        }
        this.tick();
    }

    public render() {
        switch (this.$type) {
            case 'all':
                return <DatePicker
                mode="datetime"
                value={this.$value?moment(this.$value,this.$format).toDate():undefined}
                onChange={this.onChange}
                format={"YYYY-MM-DD HH:mm"}
                extra={"请选择"}
            >
                <List.Item arrow="horizontal"></List.Item>
            </DatePicker>
            case 'date': return <DatePicker
                mode="date"
                value={this.$value?moment(this.$value,this.$format).toDate():undefined}
                onChange={this.onChange}
                format={"YYYY-MM-DD"}
            >
                <List.Item></List.Item>
            </DatePicker>

            case 'time':
                return <DatePicker
                mode="time"
                value={this.$value?moment(this.$value,this.$format).toDate():undefined}
                onChange={this.onChange}
                format={"HH:mm"}
            >
                <List.Item></List.Item>
            </DatePicker>
        }
        return (<></>);
    }

    private tick(): void {
        this.setState({
            date: new Date()
        });
    }

}