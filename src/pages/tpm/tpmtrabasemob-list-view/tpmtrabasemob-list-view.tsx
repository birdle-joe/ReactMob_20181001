import { withRouter } from 'react-router-dom';
import { TPMTRABASEMobListViewBase } from './tpmtrabasemob-list-view.base';
import './tpmtrabasemob-list-view.less';

class TPMTRABASEMobListView extends TPMTRABASEMobListViewBase {

    constructor(props: any, context: any) {
        super(props, context, {
            url: '/WeChat/Tpm/TPMTRABASEMobListView.do'
        });
    }

}

export default withRouter(TPMTRABASEMobListView);