import { withRouter } from 'react-router-dom';
import { TPMTRAEXAMMobListViewBase } from './tpmtraexammob-list-view.base';
import './tpmtraexammob-list-view.less';

class TPMTRAEXAMMobListView extends TPMTRAEXAMMobListViewBase {

    constructor(props: any, context: any) {
        super(props, context, {
            url: '/WeChat/Tpm/TPMTRAEXAMMobListView.do'
        });
    }

}

export default withRouter(TPMTRAEXAMMobListView);