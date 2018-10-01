import React from "react";
import { Collapse, Row, Col } from "antd";
import { IBizFormItem } from "./IBizFormItem";
import { List } from 'antd-mobile';

/**
 * 表单分组
 * 
 * @export
 * @class IBizFormGroup
 * @extends {IBizFormItem}
 */
export class IBizFormGroup extends IBizFormItem {

    /**
     * 部件集合
     * 
     * @type {*}
     * @memberof IBizFormGroup
     */
    public $editor: any = {};

    /**
     * 子表单项
     *
     * @type {string[]}
     * @memberof IBizFormPage
     */
    public $child: string[] = [];
    /**
     * 布局
     *
     * @private
     * @type {number}
     * @memberof IBizFormGroup
     */
    private $lg: number;
    private $md: number;
    private $sm: number;
    private $xs: number;

    /**
     * Creates an instance of IBizFormGroup.
     * 创建 IBizFormGroup 实例
     * 
     * @param {*} [opts={}]
     * @memberof IBizFormGroup
     */
    constructor(opts: any = {}) {
        super(opts);
        if (opts.child && Array.isArray(opts.child)) {
            this.$child = opts.child;
        }
        const { lg, md, sm, xs } = opts;
        if (lg && lg > 0) {
            this.$lg = lg;
        }
        if (md && md > 0) {
            this.$md = md;
        }
        if (sm && sm > 0) {
            this.$sm = sm;
        }
        if (xs && xs > 0) {
            this.$xs = xs;
        }
    }

    /**
     * 注册部件
     * 
     * @param {string} name 
     * @param {*} editor 
     * @memberof IBizFormGroup
     */
    public regEditor(name: string, editor: any) {
        if (name) {
            this.$editor[name] = editor;
        }
    }

    /**
     * 获取指定部件
     * 
     * @param {string} name 
     * @memberof IBizFormGroup
     */
    public getEditor(name: string): any {
        if (name) {
            return this.$editor[name];
        }
        return null;
    }

    /**
     * 设置是否启用
     * 
     * @param {boolean} disabled 
     * @memberof IBizFormGroup
     */
    public setDisabled(disabled: boolean): void {
        this.disabled = disabled;
    }

    /**
     * 设置可见性
     * 
     * @param {boolean} visible 
     * @memberof IBizFormGroup
     */
    public setVisible(visible: boolean): void {
        this.visible = visible;
    }

    /**
     * 绘制分组
     *
     * @memberof IBizFormPage
     */
    public render() {
        if (this.$render && this.$render instanceof Function) {
            return this.$render(this);
        }
        let fields;
        const items = this.getForm().$items;
        if (items) {
            fields = this.$child.map((name: string) => {
                const item = items[name];
                return item.render();
            });
        }
        let colConfig: any = {};
        if (this.$lg) {
            colConfig.lg = this.$lg;
        }
        if (this.$md) {
            colConfig.md = this.$md;
        }
        if (this.$sm) {
            colConfig.sm = this.$sm;
        }
        if (this.$xs) {
            colConfig.lg = this.$xs;
        }
        return (
              <div>
                  {fields}
              </div>
            // <List className="my-list">
            // <List.Item arrow="horizontal" multipleLine>
            //     <Collapse bordered={false} defaultActiveKey={[this.getName()]}>
            //         <Collapse.Panel key={this.getName()} header={this.getCaption()}>
            //                 <div>
            //                     {fields}
            //                </div>
            //         </Collapse.Panel>
            //     </Collapse>
            //     </List.Item>
            //     </List>
        );
    }

}