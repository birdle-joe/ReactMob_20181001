
import React from 'react';
import { List } from 'antd-mobile';
import { Form } from 'antd';
import { IBizEditForm } from 'ibizsys';
import { IBizFormField } from 'ibizsys';
import { IBizToolbar } from 'ibizsys';

/**
 * 编辑表单部件服务对象
 * 
 * @export
 * @class EditForm
 * @extends { IBizEditForm }
 */
export class EditForm extends IBizEditForm {

    /**
     * Creates an instance of EditForm
     * 创建 EditForm实例
     * 
     * @param {*} props
     * @param {*} context
     * @memberof EditForm
     */
    constructor(props: any, context: any) {
        super(props, context, props.opts);
    }

    /**
     * 注册编辑表单项
     * 
     * @memberof EditForm
     */
    public regFormItems(): void {
        this.regFormItem(new IBizFormField({name: 'srforikey', visible: false, type: 'HIDDENFORMITEM', form:this}));
        this.regFormItem(new IBizFormField({name: 'srfkey', visible: false, type: 'HIDDENFORMITEM', form:this}));
        this.regFormItem(new IBizFormField({name: 'srfmajortext', visible: false, type: 'HIDDENFORMITEM', form:this}));
        this.regFormItem(new IBizFormField({name: 'srftempmode', visible: false, type: 'HIDDENFORMITEM', form:this}));
        this.regFormItem(new IBizFormField({name: 'srfuf', visible: false, type: 'HIDDENFORMITEM', form:this}));
        this.regFormItem(new IBizFormField({name: 'srfdeid', visible: false, type: 'HIDDENFORMITEM', form:this}));
        this.regFormItem(new IBizFormField({name: 'srfsourcekey', visible: false, type: 'HIDDENFORMITEM', form:this}));
        this.regFormItem(new IBizFormField({name: 'certno', visible: false, type: 'HIDDENFORMITEM', form:this}));
    }


}
/**
 * 工具栏部件服务对象
 * 
 * @export
 * @class Righttoolbar
 * @extends { IBizToolbarControl }
 */
export class Righttoolbar extends IBizToolbar {

    /**
     * Creates an instance of Righttoolbar
     * 创建 Righttoolbar实例
     * 
     * @param {*} props
     * @param {*} context
     * @memberof Righttoolbar
     */
    constructor(props: any, context: any) {
        super(props, context, props.opts);
    }

    /**
     * 注册工具栏按钮
     * 
     * @memberof Righttoolbar
     */
    public regToolBarItems(): void {
        this.regToolBarItem({ name: 'tbitem1', caption: '保存', tag: 'SaveAndExit', target: '', priv: '', icon: '../sasrfex/images/default/icon_saveandclose.png', iconcls: 'sx-tb-saveandclose' }
);
    }

}

export default class {}