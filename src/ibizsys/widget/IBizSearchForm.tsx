import React from 'react';
import { Form, Tabs, Row, Col, Button } from 'antd';
import { IBizFormControl } from './IBizFormControl';
import { IBizEvent } from '../IBizEvent';
import { SearchBar } from 'antd-mobile';

/**
 * 搜索表单部件服务对象
 *
 * @export
 * @class IBizSearchForm
 * @extends {IBizFormControl}
 */
export class IBizSearchForm extends IBizFormControl {

    /**
     * 是搜重置搜索
     *
     * @type {boolean}
     * @memberof IBizSearchForm
     */
    public $bResetting: boolean = false;

    /**
     * 搜索表单是否打开
     *
     * @type {boolean}
     * @memberof IBizSearchForm
     */
    public $opened: boolean = false;

    /**
     * Creates an instance of IBizSearchForm.
     * @param {*} props
     * @param {*} context
     * @param {*} [opts={}]
     * @memberof IBizSearchForm
     */
    constructor(props: any, context: any, opts: any = {}) {
        super(props, context, opts);
    }

    /**
     * 表单类型
     *
     * @returns {string}
     * @memberof IBizSearchForm
     */
    public getFormType(): string {
        return 'SEARCHFORM';
    }

    /**
     * 执行搜索功能
     *
     * @memberof IBizSearchForm
     */
    public onSearch = (): void => {
        this.fire(IBizEvent.IBizSearchForm_FORMSEARCHED, null);
    }

    /**
     * 重置表单
     *
     * @memberof IBizSearchForm
     */
    public onReset = (): void => {
        this.$bResetting = true;
        this.reset();
    }

    /**
     * 搜索表单草稿加载完成
     *
     * @memberof IBizSearchForm
     */
    public onDraftLoaded(): void {
        super.onDraftLoaded();
        if (this.$bResetting) {
            this.$bResetting = false;
            this.fire(IBizEvent.IBizSearchForm_FORMRESETED, null);
        }
    }

    /**
     * 搜索表单加载完成
     *
     * @memberof IBizSearchForm
     */
    public onLoaded(): void {
        super.onLoaded();
        if (this.$bResetting) {
            this.$bResetting = false;
            this.fire(IBizEvent.IBizSearchForm_FORMRESETED, null);
        }
    }

    /**
     * 搜索功能是否支持,全支持
     *
     * @returns {boolean}
     * @memberof IBizSearchForm
     */
    public isOpen(): boolean {
        return true;
    }

    /**
     * 搜索表单展开状态改变
     *
     * @memberof IBizSearchForm
     */
    public openChange = (): void => {
        this.$opened = !this.$opened;
        this.tick();
    }

    /**
     * 关闭搜索功能
     *
     * @memberof IBizSearchForm
     */
    public close(): void {
        this.$opened = false;
        this.tick();
    }

    /**
     * 表单绘制
     *
     * @memberof IBizFormControl
     */
    public render() {
        let formContent;
        const keys: string[] = Object.keys(this.$items);
        if (this.$opened) {
            formContent = <>
                <Row gutter={16}>
                    <Col span={24}>
                        <Tabs>{keys.map((key: any) => {
                            const item = this.$items[key];
                            if (Object.is(item.getType(), 'FORMPAGE')) {
                                return item.render();
                            }
                        })}</Tabs>
                    </Col>
                </Row>
                <Row gutter={16} style={{paddingBottom: 12, borderBottom: '1px solid #e8e8e8'}}>
                    <Col span={26} style={{ textAlign: 'right' }}>
                        <Button type="primary" htmlType="submit" onClick={this.onSearch}>搜索</Button>
                        <Button style={{ marginLeft: 8 }} onClick={this.onReset}>重置</Button>
                    </Col>
                </Row>
            </>;
        }
        // return <Form className="ibiz-search-form ant-advanced-search-form" style={{ paddingBottom: 12 }}> {formContent} </Form>;

        return  <SearchBar placeholder="Search"  onSubmit={this.onSearch} />;
    }
}

