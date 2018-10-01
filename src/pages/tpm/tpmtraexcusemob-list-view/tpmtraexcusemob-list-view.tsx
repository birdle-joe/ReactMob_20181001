import { withRouter } from 'react-router-dom';
import { TPMTRAEXCUSEMobListViewBase } from './tpmtraexcusemob-list-view.base';
import './tpmtraexcusemob-list-view.less';

class TPMTRAEXCUSEMobListView extends TPMTRAEXCUSEMobListViewBase {

    constructor(props: any, context: any) {
        super(props, context, {
            url: '/WeChat/Tpm/TPMTRAEXCUSEMobListView.do'
        });
    }

}

export default withRouter(TPMTRAEXCUSEMobListView);