
import React from 'react';
import { List } from 'antd-mobile';
import { Form } from 'antd';
import { IBizEditForm } from 'ibizsys';
import { IBizFormField } from 'ibizsys';
import { IBizFormPage } from 'ibizsys';
import { IBizFormGroup } from 'ibizsys';
import { InputItem} from 'antd-mobile';
import { IBizPopover } from 'ibizsys';
import { IBizDatePicker } from 'ibizsys';
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
        this.regFormItem(new IBizFormField({name: 'srfupdatedate', visible: false, type: 'HIDDENFORMITEM', form:this}));
        this.regFormItem(new IBizFormField({name: 'srforikey', visible: false, type: 'HIDDENFORMITEM', form:this}));
        this.regFormItem(new IBizFormField({name: 'srfkey', visible: false, type: 'HIDDENFORMITEM', form:this}));
        this.regFormItem(new IBizFormField({name: 'srfmajortext', visible: false, type: 'HIDDENFORMITEM', form:this}));
        this.regFormItem(new IBizFormField({name: 'srftempmode', visible: false, type: 'HIDDENFORMITEM', form:this}));
        this.regFormItem(new IBizFormField({name: 'srfuf', visible: false, type: 'HIDDENFORMITEM', form:this}));
        this.regFormItem(new IBizFormField({name: 'srfdeid', visible: false, type: 'HIDDENFORMITEM', form:this}));
        this.regFormItem(new IBizFormField({name: 'srfsourcekey', visible: false, type: 'HIDDENFORMITEM', form:this}));
        this.regFormItem(new IBizFormField({name: 'tpmtraexamid', visible: false, type: 'HIDDENFORMITEM', form:this}));
        this.regFormItem(new IBizFormPage({name:'formpage1', caption: '基本信息', visible: true, type: 'FORMPAGE', form:this, child: [
            'group1', 
        ]}));
        this.regFormItem(new IBizFormGroup({name:'group1', caption: '学员考试报名基本信息', visible: true, type: 'GROUPPANEL', isShowCaption: true, titleBarCloseMode:'0', md: 24, form:this, child: [
            'tpmtrabaseid', 'tpmtrabasename', 'certno', 'mobileno', 'examcode', 'examineetype', 'submittime', 
        ]}));
        this.regFormItem(new IBizFormField({name: 'tpmtrabaseid', caption: '集训学员', visible: true, type: 'FORMITEM', allowEmpty: false, form:this, render: this.tpmtrabaseid_render.bind(this)}));
        this.regFormItem(new IBizFormField({name: 'tpmtrabasename', caption: '姓名', visible: true, type: 'FORMITEM', allowEmpty: false, form:this, render: this.tpmtrabasename_render.bind(this)}));
        this.regFormItem(new IBizFormField({name: 'certno', caption: '证件号', visible: true, type: 'FORMITEM', allowEmpty: true, form:this, render: this.certno_render.bind(this)}));
        this.regFormItem(new IBizFormField({name: 'mobileno', caption: '手机号码', visible: true, type: 'FORMITEM', allowEmpty: false, form:this, render: this.mobileno_render.bind(this)}));
        this.regFormItem(new IBizFormField({name: 'examcode', caption: '考试代码', visible: true, type: 'FORMITEM', allowEmpty: false, form:this, render: this.examcode_render.bind(this)}));
        this.regFormItem(new IBizFormField({name: 'examineetype', caption: '考生类型', visible: true, type: 'FORMITEM', allowEmpty: false, form:this, render: this.examineetype_render.bind(this)}));
        this.regFormItem(new IBizFormField({name: 'submittime', caption: '提报时间', visible: true, type: 'FORMITEM', allowEmpty: false, form:this, render: this.submittime_render.bind(this)}));
    }

    /**
     * 表单项tpmtrabaseid模板
     *
     * @returns {*} tpmtrabaseid模板
     * @memberof EditForm
     */
    public tpmtrabaseid_render(item: any) {
        return <List key={item.getName()}>
				<List.Item  thumb={ <Form.Item   key={item.getName()}  required={item.allowEmpty} colon={true} label={item.getCaption()}> </Form.Item>}   >
					<InputItem type="text" clear  disabled={item.disabled} value={item.value} onChange={item.onChange} />		
				</List.Item>
		</List>;
    }

    /**
     * 表单项tpmtrabasename模板
     *
     * @returns {*} tpmtrabasename模板
     * @memberof EditForm
     */
    public tpmtrabasename_render(item: any) {
        return <List key={item.getName()}>
				<List.Item  thumb={ <Form.Item   key={item.getName()}  required={item.allowEmpty} colon={true} label={item.getCaption()}> </Form.Item>}   >
					<InputItem type="text" clear  disabled={item.disabled} value={item.value} onChange={item.onChange} />		
				</List.Item>
		</List>;
    }

    /**
     * 表单项certno模板
     *
     * @returns {*} certno模板
     * @memberof EditForm
     */
    public certno_render(item: any) {
        return <List key={item.getName()}>
				<List.Item  thumb={ <Form.Item   key={item.getName()}  required={item.allowEmpty} colon={true} label={item.getCaption()}> </Form.Item>}   >
					<InputItem type="text" clear  disabled={item.disabled} value={item.value} onChange={item.onChange} />		
				</List.Item>
		</List>;
    }

    /**
     * 表单项mobileno模板
     *
     * @returns {*} mobileno模板
     * @memberof EditForm
     */
    public mobileno_render(item: any) {
        return <List key={item.getName()}>
				<List.Item  thumb={ <Form.Item   key={item.getName()}  required={item.allowEmpty} colon={true} label={item.getCaption()}> </Form.Item>}   >
					<InputItem type="text" clear  disabled={item.disabled} value={item.value} onChange={item.onChange} />		
				</List.Item>
		</List>;
    }

    /**
     * 表单项examcode模板
     *
     * @returns {*} examcode模板
     * @memberof EditForm
     */
    public examcode_render(item: any) {
        return <List key={item.getName()}>
				<List.Item  thumb={ <Form.Item   key={item.getName()}  required={item.allowEmpty} colon={true} label={item.getCaption()}> </Form.Item>}   >
					<IBizPopover name={item.getName()} disabled={item.disabled} valueItem="" form={this} config={item.config} value={item.value} onChange={item.onChange}></IBizPopover>		
				</List.Item>
		</List>;
    }

    /**
     * 表单项examineetype模板
     *
     * @returns {*} examineetype模板
     * @memberof EditForm
     */
    public examineetype_render(item: any) {
        return <List key={item.getName()}>
				<List.Item  thumb={ <Form.Item   key={item.getName()}  required={item.allowEmpty} colon={true} label={item.getCaption()}> </Form.Item>}   >
					<IBizPopover name={item.getName()} disabled={item.disabled} valueItem="" form={this} config={item.config} value={item.value} onChange={item.onChange}></IBizPopover>		
				</List.Item>
		</List>;
    }

    /**
     * 表单项submittime模板
     *
     * @returns {*} submittime模板
     * @memberof EditForm
     */
    public submittime_render(item: any) {
        return <List key={item.getName()}>
				<List.Item  thumb={ <Form.Item   key={item.getName()}  required={item.allowEmpty} colon={true} label={item.getCaption()}> </Form.Item>}   >
					<IBizDatePicker type="all" format="YYYY-MM-DD HH:mm:ss" value={item.value} disabled={item.disabled} onChange={item.onChange} />		
				</List.Item>
		</List>;
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