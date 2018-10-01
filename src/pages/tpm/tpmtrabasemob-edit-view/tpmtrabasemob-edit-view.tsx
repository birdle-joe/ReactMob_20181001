import { withRouter } from 'react-router-dom';
import { TPMTRABASEMobEditViewBase } from './tpmtrabasemob-edit-view.base';
import './tpmtrabasemob-edit-view.less';

class TPMTRABASEMobEditView extends TPMTRABASEMobEditViewBase {

    constructor(props: any, context: any) {
        super(props, context, {
            url: '/WeChat/Tpm/TPMTRABASEMobEditView.do'
        });
    }

}

export default withRouter(TPMTRABASEMobEditView);