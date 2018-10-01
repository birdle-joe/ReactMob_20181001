import React from "react";
import { Tabs, Row } from "antd";
import { IBizFormItem } from "./IBizFormItem";
import { List } from 'antd-mobile';

/**
 * 表单分页部件
 *
 * @export
 * @class IBizFormPage
 * @extends {IBizForm}
 */
export class IBizFormPage extends IBizFormItem {

    /**
     * 子表单项
     *
     * @type {string[]}
     * @memberof IBizFormPage
     */
    public $child: string[] = [];

    /**
     * Creates an instance of IBizFormPage.
     * 创建 IBizFormPage 实例
     * 
     * @param {*} [opts={}]
     * @memberof IBizFormPage
     */
    constructor(opts: any = {}) {
        super(opts);
        if (opts.child && Array.isArray(opts.child)) {
            this.$child = opts.child;
        }
    }

    /**
     * 绘制分页
     *
     * @memberof IBizFormPage
     */
    public render() {
        if (this.$render && this.$render instanceof Function) {
            return this.$render(this);
        }
        let group;
        const items = this.getForm().$items;
        if (items) {
            group = this.$child.map((name: string) => {
                const item = items[name];
                return item.render();
            });
        }
        return (
            // <div>hello react</div>
            //  <Tabs.TabPane className="ibiz-form-page"  key={this.getName()} tab={this.getCaption()}>
                   <div key={this.getName()}>  {group}   </div>
            //  </Tabs.TabPane>
        );
    }

}