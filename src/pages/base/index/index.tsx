import { withRouter } from 'react-router-dom';
import { IndexBase } from './index.base';
import './index.less';

class Index extends IndexBase {

    constructor(props: any, context: any) {
        super(props, context, {
            url: '/WeChat/Base/Index.do'
        });
    }

}

export default withRouter(Index);