import { withRouter } from 'react-router-dom';
import { PortalTPMBase } from './portal-tpm.base';
import './portal-tpm.less';

class PortalTPM extends PortalTPMBase {

    constructor(props: any, context: any) {
        super(props, context, {
            url: '/WeChat/Base/PortalTPM.do'
        });
    }

}

export default withRouter(PortalTPM);