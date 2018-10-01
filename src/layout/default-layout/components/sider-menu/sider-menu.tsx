import React, { PureComponent } from 'react';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';
import './sider-menu.less';
import { IBizEnvironment } from '../../../../environments/IBizEnvironment';

export default class SiderMenu extends PureComponent<any, any> {

    constructor(props: any) {
        super(props);
    }

    public render() {
        const { logo, collapsed, layoutHeight } = this.props;
        return (
            <Layout.Sider
                trigger={null}
                collapsible={true}
                collapsed={collapsed}
                breakpoint='lg'
                width={236}
                className='sider'
                style={{height: layoutHeight}}>
                <div className="ibiz-sider-menu-content">
                    <div className='logo' key='logo'>
                        <Link to='/'>
                            <img src={logo} alt='logo' />
                            <h1>{IBizEnvironment.AppName}</h1>
                        </Link>
                    </div>
                    <div className="ibiz-sider-menus" style={{height: layoutHeight - 64, overflowY: "auto"}}>
                        {this.props.menu}
                    </div>
                </div>
            </Layout.Sider>
        );
    }
}
