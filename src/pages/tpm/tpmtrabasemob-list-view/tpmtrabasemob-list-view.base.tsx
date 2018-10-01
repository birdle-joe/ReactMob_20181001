
import React from 'react';
import { Input } from 'antd';
import { SearchBar } from 'antd-mobile';
import { IBizListViewController } from 'ibizsys';
import './tpmtrabasemob-list-view.less';
import { 
  Mdctrl,
  Righttoolbar,
} from './tpmtrabasemob-list-view.control';

export class TPMTRABASEMobListViewBase extends IBizListViewController {

    protected mdctrl: Mdctrl;
    protected righttoolbar: Righttoolbar;

    constructor(props: any, context: any, opt: any) {
        super(props, context, opt);
    }

     public render() {
        return (<div>  <Righttoolbar {...this.props} opts={{'viewController': this, 'name': 'righttoolbar', 'url': this.getBackendUrl()}} title="集训学员"  ref={(ref: any) => {this.righttoolbar = ref;this.regControl('righttoolbar', ref)}}     />
                 <SearchBar placeholder="请输入搜索条件" onChange={this.onQuickSearchValueChange} onSubmit={this.onQuickSearch}/>
            <Mdctrl {...this.props} opts={{'viewController': this, 'name': 'mdctrl', 'url': this.getBackendUrl()}} ref="mdctrl" viewtype={'list'}/>
        </div>);
    }

     
    /**
     * 获取新建视图
     * 
     * @param {any} arg 
     * @returns {*} 
     * @memberof TPMTRABASEMobListViewComponentBase
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
      	    let view = { openMode:'', className:'TPMTRABASEMobEditView', viewUrl: 'tpm_tpmtrabasemobeditview', viewParam:params };
      	    return view;
        }
    }

    /**
     * 获取编辑视图
     * 
     * @param {any} arg 
     * @returns {*} 
     * @memberof TPMTRABASEMobListViewComponentBase
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
            return { openMode:'', className:'TPMTRABASEMobEditView', viewUrl: 'tpm_tpmtrabasemobeditview', viewParam:params };
        }
    }
    
    /**
     * 注册实体支持快速搜索字段
     * 
     * @memberof TPMTRABASEMobListViewComponentBase
     */
    public regQuickSearchDEFileds(): void {
        this.$quickSearchEntityDEFields.push({ id: 'c84b2d1214694e36b2c53b7d15a687b7', name: 'tpmtrabasename', logicname: '集训学员名称', datatype: 'text' });
    }

public regModalViews(): void {
        this.regModalView('TPMTRABASEMobEditView', () => import('@pages/tpm/tpmtrabasemob-edit-view/tpmtrabasemob-edit-view'));
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