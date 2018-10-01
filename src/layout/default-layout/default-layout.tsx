import React, { Fragment } from 'react';
import { Icon, Layout, BackTop } from 'antd';
import './default-layout.less';
import GlobalHeader from '@layout/default-layout/components/global-header/global-header';
import GlobalFooter from '@layout/default-layout/components/global-footer/global-footer';
import SiderMenu from '@layout/default-layout/components/sider-menu/sider-menu';
import { IBizBreadcrumb } from 'ibizsys';

const { Header, Footer, Content } = Layout;

export default class DefaultLayout extends React.Component<any, any> {
    /**
     * 内容区div的Dom
     *
     * @private
     * @type {*}
     * @memberof DefaultLayout
     */
    private contentLayout: Element;

    constructor(props: any) {
        super(props);
        this.state = {
            layoutHeight: window.innerHeight
        };
    }

    /**
     * 组件加载完毕
     *
     * @memberof DefaultLayout
     */
    public componentDidMount() {
        window.onresize = () => {
            this.setState({
                layoutHeight: window.innerHeight
            });
        }
    }

    /**
     * 需要返回顶部按钮的内容区
     *
     * @memberof DefaultLayout
     */
    public targetContainer = (): any => {
        return this.contentLayout;
    }

    /**
     * 个人信息菜单点击事件
     *
     * @memberof DefaultLayout
     */
    public handleMenuClick = (key) => { }

    public render() {
        return (<Layout style={{ height: this.state.layoutHeight }}>
            <SiderMenu
                layoutHeight={this.state.layoutHeight}
                logo='assets/img/logo.svg'
                menu={this.props.menu}
                collapsed={this.props.collapsed}
            />
            <div className="ant-layout" ref={(ref: any) => this.contentLayout = ref}>
                <Header style={{ padding: 0 }}>
                    <GlobalHeader
                        onMenuClick={this.handleMenuClick}
                        onCollapse={this.props.onCollapse}
                        collapsed={this.props.collapsed}
                    />
                </Header>
                <Content style={{ margin: '12px 0px 0px 12px' }}>
                    <IBizBreadcrumb />
                    {this.props.children}
                </Content>
                <Footer style={{ padding: 0 }}>
                    <GlobalFooter>
                        <Fragment>
                            Copyright <Icon type='copyright' /> 2018 iBizSys
                        </Fragment>
                    </GlobalFooter>
                </Footer>
            </div>
            <BackTop target={this.targetContainer} visibilityHeight={100}/>
        </Layout>);
    }
}
