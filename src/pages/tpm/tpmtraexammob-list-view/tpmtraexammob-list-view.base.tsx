
import React from 'react';
import { Input } from 'antd';
import { SearchBar } from 'antd-mobile';
import { IBizListViewController } from 'ibizsys';
import './tpmtraexammob-list-view.less';
import { 
  Mdctrl,
  Righttoolbar,
} from './tpmtraexammob-list-view.control';

export class TPMTRAEXAMMobListViewBase extends IBizListViewController {

    protected mdctrl: Mdctrl;
    protected righttoolbar: Righttoolbar;

    constructor(props: any, context: any, opt: any) {
        super(props, context, opt);
    }

     public render() {
        return (<div>  <Righttoolbar {...this.props} opts={{'viewController': this, 'name': 'righttoolbar', 'url': this.getBackendUrl()}} title="学员考试报名"  ref={(ref: any) => {this.righttoolbar = ref;this.regControl('righttoolbar', ref)}}     />
                 <SearchBar placeholder="请输入搜索条件" onChange={this.onQuickSearchValueChange} onSubmit={this.onQuickSearch}/>
            <Mdctrl {...this.props} opts={{'viewController': this, 'name': 'mdctrl', 'url': this.getBackendUrl()}} ref="mdctrl" viewtype={'list'}/>
        </div>);
    }

     
    /**
     * 获取新建视图
     * 
     * @param {any} arg 
     * @returns {*} 
     * @memberof TPMTRAEXAMMobListViewComponentBase
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
      	    let view = { openMode:'', className:'TPMTRAEXAMMobEditView', viewUrl: 'tpm_tpmtraexammobeditview', viewParam:params };
      	    return view;
        }
    }

    /**
     * 获取编辑视图
     * 
     * @param {any} arg 
     * @returns {*} 
     * @memberof TPMTRAEXAMMobListViewComponentBase
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
            return { openMode:'', className:'TPMTRAEXAMMobEditView', viewUrl: 'tpm_tpmtraexammobeditview', viewParam:params };
        }
    }
    
    /**
     * 注册实体支持快速搜索字段
     * 
     * @memberof TPMTRAEXAMMobListViewComponentBase
     */
    public regQuickSearchDEFileds(): void {
        this.$quickSearchEntityDEFields.push({ id: 'bc3f01a43330fd66ea63f638cab7d2f7', name: 'tpmtraexamname', logicname: '学员考试报名名称', datatype: 'text' });
    }

public regModalViews(): void {
        this.regModalView('TPMTRAEXAMMobEditView', () => import('@pages/tpm/tpmtraexammob-edit-view/tpmtraexammob-edit-view'));
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