

import React from 'react';
import { IBizEditViewController } from 'ibizsys';
import './weclass-task-mob-edit-view.less';
import { 
  EditForm,
  Righttoolbar,
} from './weclass-task-mob-edit-view.control';

export class WEClassTaskMobEditViewBase extends IBizEditViewController {

    protected form: EditForm;
    protected righttoolbar: Righttoolbar;

    constructor(props: any, context: any, opt: any) {
        super(props, context, opt);
    }

    public render() {
        return (<div>   <Righttoolbar {...this.props} opts={{'viewController': this, 'name': 'righttoolbar', 'url': this.getBackendUrl()}}   ref={(ref: any) => {this.righttoolbar = ref;this.regControl('righttoolbar', ref)}} title={this.$dataInfo} />
            <EditForm {...this.props} opts={{'viewController': this, 'name': 'form', 'url': this.getBackendUrl()}} ref="form"/>
        </div>);
    }


    /**
     * 表单项值变化事件
     * 
     * @param {string} fieldname 
     * @param {*} value 
     * @param {*} [field={}] 
     * @memberof WEClassTaskMobEditViewComponentBase
     */
    public onFormFieldChanged(fieldname: string, field: any, value: string): void {
        const form = this.getForm();

    }

    /**
     * 表单项值检测
     *
     * @param {string} fieldname
     * @param {string} value
     * @memberof WEClassTaskMobEditViewComponentBase
     */
    public onFormFieldValueCheck(name: string, value: string): void {
        const form = this.getForm();
    }






public regModalViews(): void {
    }

public regUIActions(): void{

   const uiaction_goback = { type: 'DEUIACTION', tag: 'GoBack'
  , actionparams: { vlaueitem: '', paramitem: '', textitem: '', paramjo: { } }   };
  super.regUIAction(uiaction_goback);

  
  const uiaction_0 = { type: 'DEUIACTION', tag: 'SaveAndExit'
  , actionparams: { vlaueitem: '', paramitem: '', textitem: '', paramjo: { } }   };
  super.regUIAction(uiaction_0);
}

}