
import React from 'react';
import { Input } from 'antd';
import { SearchBar } from 'antd-mobile';
import { IBizListViewController } from 'ibizsys';
import './tpmtraexcusemob-list-view.less';
import { 
  Mdctrl,
  Righttoolbar,
} from './tpmtraexcusemob-list-view.control';

export class TPMTRAEXCUSEMobListViewBase extends IBizListViewController {

    protected mdctrl: Mdctrl;
    protected righttoolbar: Righttoolbar;

    constructor(props: any, context: any, opt: any) {
        super(props, context, opt);
    }

     public render() {
        return (<div>  <Righttoolbar {...this.props} opts={{'viewController': this, 'name': 'righttoolbar', 'url': this.getBackendUrl()}} title="学员请假管理"  ref={(ref: any) => {this.righttoolbar = ref;this.regControl('righttoolbar', ref)}}     />
                 <SearchBar placeholder="请输入搜索条件" onChange={this.onQuickSearchValueChange} onSubmit={this.onQuickSearch}/>
            <Mdctrl {...this.props} opts={{'viewController': this, 'name': 'mdctrl', 'url': this.getBackendUrl()}} ref="mdctrl" viewtype={'list'}/>
        </div>);
    }

     
    /**
     * 获取新建视图
     * 
     * @param {any} arg 
     * @returns {*} 
     * @memberof TPMTRAEXCUSEMobListViewComponentBase
     */
    public getNewDataView(params: any): any {
        if (!params) {
            params={};
        }
        let newmode = params.srfnewmode;
        if (!newmode) {
            newmode = '';
        }
        
        if (true) {
      	    let view = { openMode:'', className:'TPMTRAEXCUSEMobEditView', viewUrl: 'tpm_tpmtraexcusemobeditview', viewParam:params };
      	    return view;
        }
    }

    /**
     * 获取编辑视图
     * 
     * @param {any} arg 
     * @returns {*} 
     * @memberof TPMTRAEXCUSEMobListViewComponentBase
     */
    public getEditDataView(params: any): any {
        if (!params) {
            params={};
        }
           
        let list = [params.srfeditmode2,params.srfeditmode];
        for(let i=0;i<2;i++){
            let editmode = list[i];
            if (!editmode) {
                continue;
            }
        }

        if (true) {
            params.srfeditmode = undefined;
            return { openMode:'', className:'TPMTRAEXCUSEMobEditView', viewUrl: 'tpm_tpmtraexcusemobeditview', viewParam:params };
        }
    }
    
    /**
     * 注册实体支持快速搜索字段
     * 
     * @memberof TPMTRAEXCUSEMobListViewComponentBase
     */
    public regQuickSearchDEFileds(): void {
        this.$quickSearchEntityDEFields.push({ id: '714b90538a54d50df83789b733f32b63', name: 'tpmtraexcusename', logicname: '学员请假管理名称', datatype: 'text' });
    }

public regModalViews(): void {
        this.regModalView('TPMTRAEXCUSEMobEditView', () => import('@pages/tpm/tpmtraexcusemob-edit-view/tpmtraexcusemob-edit-view'));
    }

public regUIActions(): void{

   const uiaction_goback = { type: 'DEUIACTION', tag: 'GoBack'
  , actionparams: { vlaueitem: '', paramitem: '', textitem: '', paramjo: { } }   };
  super.regUIAction(uiaction_goback);

  
  const uiaction_0 = { type: 'DEUIACTION', tag: 'New'
  , actionparams: { vlaueitem: '', paramitem: '', textitem: '', paramjo: { } }   };
  super.regUIAction(uiaction_0);
  
  const uiaction_1 = { type: 'DEUIACTION', tag: 'Help'
  , actionparams: { vlaueitem: '', paramitem: '', textitem: '', paramjo: { } }   };
  super.regUIAction(uiaction_1);
}

}