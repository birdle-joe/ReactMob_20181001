import { withRouter } from 'react-router-dom';
import { PortalBase } from './portal.base';
import './portal.less';

class Portal extends PortalBase {

    constructor(props: any, context: any) {
        super(props, context, {
            url: '/WeChat/Base/Portal.do'
        });
    }

}

export default withRouter(Portal);