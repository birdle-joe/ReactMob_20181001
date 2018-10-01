import React, { Component } from 'react';
import './global-footer.less';

export default class GlobalFooter extends Component {
    public render() {
        return (
            <div className='globalFooter'>
                <div className='copyright'>{this.props.children}</div>
            </div>
        );
    }
}
