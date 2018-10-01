import { withRouter } from 'react-router-dom';
import { TPMTRAEXAMMobEditViewBase } from './tpmtraexammob-edit-view.base';
import './tpmtraexammob-edit-view.less';

class TPMTRAEXAMMobEditView extends TPMTRAEXAMMobEditViewBase {

    constructor(props: any, context: any) {
        super(props, context, {
            url: '/WeChat/Tpm/TPMTRAEXAMMobEditView.do'
        });
    }

}

export default withRouter(TPMTRAEXAMMobEditView);