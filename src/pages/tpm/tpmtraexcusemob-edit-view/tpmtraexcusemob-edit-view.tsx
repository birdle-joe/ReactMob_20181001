import { withRouter } from 'react-router-dom';
import { TPMTRAEXCUSEMobEditViewBase } from './tpmtraexcusemob-edit-view.base';
import './tpmtraexcusemob-edit-view.less';

class TPMTRAEXCUSEMobEditView extends TPMTRAEXCUSEMobEditViewBase {

    constructor(props: any, context: any) {
        super(props, context, {
            url: '/WeChat/Tpm/TPMTRAEXCUSEMobEditView.do'
        });
    }

}

export default withRouter(TPMTRAEXCUSEMobEditView);