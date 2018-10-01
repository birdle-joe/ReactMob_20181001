
import React from 'react';
import { List } from 'antd-mobile';
import { Form } from 'antd';
import { IBizEditForm } from 'ibizsys';
import { IBizFormField } from 'ibizsys';
import { IBizFormPage } from 'ibizsys';
import { IBizFormGroup } from 'ibizsys';
import { InputItem} from 'antd-mobile';
import { IBizPopover } from 'ibizsys';
import { IBizImageUpload } from 'ibizsys';
import { IBizDatePicker } from 'ibizsys';
import { IBizUpload } from 'ibizsys';
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
        this.regFormItem(new IBizFormField({name: 'tpmtrabaseid', visible: false, type: 'HIDDENFORMITEM', form:this}));
        this.regFormItem(new IBizFormPage({name:'formpage1', caption: '基本信息', visible: true, type: 'FORMPAGE', form:this, child: [
            'group1', 
        ]}));
        this.regFormItem(new IBizFormGroup({name:'group1', caption: '集训学员基本信息', visible: true, type: 'GROUPPANEL', isShowCaption: true, titleBarCloseMode:'0', md: 24, form:this, child: [
            'tpmtrabasename', 'certno', 'traineetype', 'photo', 'mobileno', 'wechatno', 'fptrareptime', 'unit', 'tpmfinishschoolid', 'foreignflysch', 'domsmerlicattatc', 'foremerlicattatc', 'atplexamtime', 'atplcertattach', 'ishaveacpccert', 'lineexamtime', 'merlicexamtime', 'instruexamtime', 'effcexamtime', 
        ]}));
        this.regFormItem(new IBizFormField({name: 'tpmtrabasename', caption: '姓名', visible: true, type: 'FORMITEM', allowEmpty: false, form:this, render: this.tpmtrabasename_render.bind(this)}));
        this.regFormItem(new IBizFormField({name: 'certno', caption: '身份证号', visible: true, type: 'FORMITEM', allowEmpty: true, form:this, render: this.certno_render.bind(this)}));
        this.regFormItem(new IBizFormField({name: 'traineetype', caption: '学员类别', visible: true, type: 'FORMITEM', allowEmpty: true, form:this, render: this.traineetype_render.bind(this)}));
        this.regFormItem(new IBizFormField({name: 'photo', caption: '照片', visible: true, type: 'FORMITEM', allowEmpty: false, form:this, render: this.photo_render.bind(this)}));
        this.regFormItem(new IBizFormField({name: 'mobileno', caption: '手机号', visible: true, type: 'FORMITEM', allowEmpty: false, form:this, render: this.mobileno_render.bind(this)}));
        this.regFormItem(new IBizFormField({name: 'wechatno', caption: '微信号', visible: true, type: 'FORMITEM', allowEmpty: false, form:this, render: this.wechatno_render.bind(this)}));
        this.regFormItem(new IBizFormField({name: 'fptrareptime', caption: '飞培报到日期', visible: true, type: 'FORMITEM', allowEmpty: false, form:this, render: this.fptrareptime_render.bind(this)}));
        this.regFormItem(new IBizFormField({name: 'unit', caption: '所属单位', visible: true, type: 'FORMITEM', allowEmpty: false, form:this, render: this.unit_render.bind(this)}));
        this.regFormItem(new IBizFormField({name: 'tpmfinishschoolid', caption: '国内毕业院校', visible: true, type: 'FORMITEM', allowEmpty: false, form:this, render: this.tpmfinishschoolid_render.bind(this)}));
        this.regFormItem(new IBizFormField({name: 'foreignflysch', caption: '国外飞行院校', visible: true, type: 'FORMITEM', allowEmpty: false, form:this, render: this.foreignflysch_render.bind(this)}));
        this.regFormItem(new IBizFormField({name: 'domsmerlicattatc', caption: '国内商照附件', visible: true, type: 'FORMITEM', allowEmpty: false, form:this, render: this.domsmerlicattatc_render.bind(this)}));
        this.regFormItem(new IBizFormField({name: 'foremerlicattatc', caption: '国外商照附件', visible: true, type: 'FORMITEM', allowEmpty: false, form:this, render: this.foremerlicattatc_render.bind(this)}));
        this.regFormItem(new IBizFormField({name: 'atplexamtime', caption: 'ATPL考试完成日期', visible: true, type: 'FORMITEM', allowEmpty: false, form:this, render: this.atplexamtime_render.bind(this)}));
        this.regFormItem(new IBizFormField({name: 'atplcertattach', caption: 'ATPL合格证附件', visible: true, type: 'FORMITEM', allowEmpty: false, form:this, render: this.atplcertattach_render.bind(this)}));
        this.regFormItem(new IBizFormField({name: 'ishaveacpccert', caption: '有无ACPC结业证', visible: true, type: 'FORMITEM', allowEmpty: false, form:this, render: this.ishaveacpccert_render.bind(this)}));
        this.regFormItem(new IBizFormField({name: 'lineexamtime', caption: '航线考试完成日期', visible: true, type: 'FORMITEM', allowEmpty: false, form:this, render: this.lineexamtime_render.bind(this)}));
        this.regFormItem(new IBizFormField({name: 'merlicexamtime', caption: '商照考试完成日期', visible: true, type: 'FORMITEM', allowEmpty: false, form:this, render: this.merlicexamtime_render.bind(this)}));
        this.regFormItem(new IBizFormField({name: 'instruexamtime', caption: '仪表考试完成日期', visible: true, type: 'FORMITEM', allowEmpty: false, form:this, render: this.instruexamtime_render.bind(this)}));
        this.regFormItem(new IBizFormField({name: 'effcexamtime', caption: '高性能考试完成日期', visible: true, type: 'FORMITEM', allowEmpty: false, form:this, render: this.effcexamtime_render.bind(this)}));
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
     * 表单项traineetype模板
     *
     * @returns {*} traineetype模板
     * @memberof EditForm
     */
    public traineetype_render(item: any) {
        return <List key={item.getName()}>
				<List.Item  thumb={ <Form.Item   key={item.getName()}  required={item.allowEmpty} colon={true} label={item.getCaption()}> </Form.Item>}   >
					<IBizPopover name={item.getName()} disabled={item.disabled} valueItem="" form={this} config={item.config} value={item.value} onChange={item.onChange}></IBizPopover>		
				</List.Item>
		</List>;
    }

    /**
     * 表单项photo模板
     *
     * @returns {*} photo模板
     * @memberof EditForm
     */
    public photo_render(item: any) {
        return <List key={item.getName()}>
				<List.Item  thumb={ <Form.Item   key={item.getName()}  required={item.allowEmpty} colon={true} label={item.getCaption()}> </Form.Item>}   >
					<IBizImageUpload disabled={item.disabled} fileList={item.value} onChange={item.onChange}/>		
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
     * 表单项wechatno模板
     *
     * @returns {*} wechatno模板
     * @memberof EditForm
     */
    public wechatno_render(item: any) {
        return <List key={item.getName()}>
				<List.Item  thumb={ <Form.Item   key={item.getName()}  required={item.allowEmpty} colon={true} label={item.getCaption()}> </Form.Item>}   >
					<InputItem type="text" clear  disabled={item.disabled} value={item.value} onChange={item.onChange} />		
				</List.Item>
		</List>;
    }

    /**
     * 表单项fptrareptime模板
     *
     * @returns {*} fptrareptime模板
     * @memberof EditForm
     */
    public fptrareptime_render(item: any) {
        return <List key={item.getName()}>
				<List.Item  thumb={ <Form.Item   key={item.getName()}  required={item.allowEmpty} colon={true} label={item.getCaption()}> </Form.Item>}   >
					<IBizDatePicker type="all" format="YYYY-MM-DD HH:mm:ss" value={item.value} disabled={item.disabled} onChange={item.onChange} />		
				</List.Item>
		</List>;
    }

    /**
     * 表单项unit模板
     *
     * @returns {*} unit模板
     * @memberof EditForm
     */
    public unit_render(item: any) {
        return <List key={item.getName()}>
				<List.Item  thumb={ <Form.Item   key={item.getName()}  required={item.allowEmpty} colon={true} label={item.getCaption()}> </Form.Item>}   >
					<IBizPopover name={item.getName()} disabled={item.disabled} valueItem="" form={this} config={item.config} value={item.value} onChange={item.onChange}></IBizPopover>		
				</List.Item>
		</List>;
    }

    /**
     * 表单项tpmfinishschoolid模板
     *
     * @returns {*} tpmfinishschoolid模板
     * @memberof EditForm
     */
    public tpmfinishschoolid_render(item: any) {
        return <List key={item.getName()}>
				<List.Item  thumb={ <Form.Item   key={item.getName()}  required={item.allowEmpty} colon={true} label={item.getCaption()}> </Form.Item>}   >
					<IBizPopover name={item.getName()} disabled={item.disabled} valueItem="" form={this} config={item.config} value={item.value} onChange={item.onChange}></IBizPopover>		
				</List.Item>
		</List>;
    }

    /**
     * 表单项foreignflysch模板
     *
     * @returns {*} foreignflysch模板
     * @memberof EditForm
     */
    public foreignflysch_render(item: any) {
        return <List key={item.getName()}>
				<List.Item  thumb={ <Form.Item   key={item.getName()}  required={item.allowEmpty} colon={true} label={item.getCaption()}> </Form.Item>}   >
					<IBizPopover name={item.getName()} disabled={item.disabled} valueItem="" form={this} config={item.config} value={item.value} onChange={item.onChange}></IBizPopover>		
				</List.Item>
		</List>;
    }

    /**
     * 表单项domsmerlicattatc模板
     *
     * @returns {*} domsmerlicattatc模板
     * @memberof EditForm
     */
    public domsmerlicattatc_render(item: any) {
        return <List key={item.getName()}>
				<List.Item  thumb={ <Form.Item   key={item.getName()}  required={item.allowEmpty} colon={true} label={item.getCaption()}> </Form.Item>}   >
					<IBizUpload disabled={item.disabled} fileList={item.value} onChange={item.onChange}/>		
				</List.Item>
		</List>;
    }

    /**
     * 表单项foremerlicattatc模板
     *
     * @returns {*} foremerlicattatc模板
     * @memberof EditForm
     */
    public foremerlicattatc_render(item: any) {
        return <List key={item.getName()}>
				<List.Item  thumb={ <Form.Item   key={item.getName()}  required={item.allowEmpty} colon={true} label={item.getCaption()}> </Form.Item>}   >
					<IBizUpload disabled={item.disabled} fileList={item.value} onChange={item.onChange}/>		
				</List.Item>
		</List>;
    }

    /**
     * 表单项atplexamtime模板
     *
     * @returns {*} atplexamtime模板
     * @memberof EditForm
     */
    public atplexamtime_render(item: any) {
        return <List key={item.getName()}>
				<List.Item  thumb={ <Form.Item   key={item.getName()}  required={item.allowEmpty} colon={true} label={item.getCaption()}> </Form.Item>}   >
					<IBizDatePicker type="all" format="YYYY-MM-DD HH:mm:ss" value={item.value} disabled={item.disabled} onChange={item.onChange} />		
				</List.Item>
		</List>;
    }

    /**
     * 表单项atplcertattach模板
     *
     * @returns {*} atplcertattach模板
     * @memberof EditForm
     */
    public atplcertattach_render(item: any) {
        return <List key={item.getName()}>
				<List.Item  thumb={ <Form.Item   key={item.getName()}  required={item.allowEmpty} colon={true} label={item.getCaption()}> </Form.Item>}   >
					<IBizUpload disabled={item.disabled} fileList={item.value} onChange={item.onChange}/>		
				</List.Item>
		</List>;
    }

    /**
     * 表单项ishaveacpccert模板
     *
     * @returns {*} ishaveacpccert模板
     * @memberof EditForm
     */
    public ishaveacpccert_render(item: any) {
        return <List key={item.getName()}>
				<List.Item  thumb={ <Form.Item   key={item.getName()}  required={item.allowEmpty} colon={true} label={item.getCaption()}> </Form.Item>}   >
					<IBizPopover name={item.getName()} disabled={item.disabled} valueItem="" form={this} config={item.config} value={item.value} onChange={item.onChange}></IBizPopover>		
				</List.Item>
		</List>;
    }

    /**
     * 表单项lineexamtime模板
     *
     * @returns {*} lineexamtime模板
     * @memberof EditForm
     */
    public lineexamtime_render(item: any) {
        return <List key={item.getName()}>
				<List.Item  thumb={ <Form.Item   key={item.getName()}  required={item.allowEmpty} colon={true} label={item.getCaption()}> </Form.Item>}   >
					<IBizDatePicker type="all" format="YYYY-MM-DD HH:mm:ss" value={item.value} disabled={item.disabled} onChange={item.onChange} />		
				</List.Item>
		</List>;
    }

    /**
     * 表单项merlicexamtime模板
     *
     * @returns {*} merlicexamtime模板
     * @memberof EditForm
     */
    public merlicexamtime_render(item: any) {
        return <List key={item.getName()}>
				<List.Item  thumb={ <Form.Item   key={item.getName()}  required={item.allowEmpty} colon={true} label={item.getCaption()}> </Form.Item>}   >
					<IBizDatePicker type="all" format="YYYY-MM-DD HH:mm:ss" value={item.value} disabled={item.disabled} onChange={item.onChange} />		
				</List.Item>
		</List>;
    }

    /**
     * 表单项instruexamtime模板
     *
     * @returns {*} instruexamtime模板
     * @memberof EditForm
     */
    public instruexamtime_render(item: any) {
        return <List key={item.getName()}>
				<List.Item  thumb={ <Form.Item   key={item.getName()}  required={item.allowEmpty} colon={true} label={item.getCaption()}> </Form.Item>}   >
					<IBizDatePicker type="all" format="YYYY-MM-DD HH:mm:ss" value={item.value} disabled={item.disabled} onChange={item.onChange} />		
				</List.Item>
		</List>;
    }

    /**
     * 表单项effcexamtime模板
     *
     * @returns {*} effcexamtime模板
     * @memberof EditForm
     */
    public effcexamtime_render(item: any) {
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