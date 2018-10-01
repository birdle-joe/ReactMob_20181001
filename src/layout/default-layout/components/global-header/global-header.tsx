import React, { PureComponent } from 'react';
import { Menu, Icon, Spin, Dropdown, Avatar } from 'antd';
import './global-header.less';
import { IBizHttp, IBizNotification } from 'ibizsys';
import { IBizEnvironment } from '../../../../environments/IBizEnvironment';

// tslint:disable-next-line:interface-name
interface GlobalHeaderProps {
    /**
     * 按钮点击回调
     *
     * @memberof GlobalHeaderProps
     */
    onMenuClick: (key: string) => void;
    /**
     * 右侧菜单栏状态
     *
     * @type {boolean}
     * @memberof GlobalHeaderProps
     */
    collapsed: boolean;
    /**
     * 通知改变右侧菜单栏状态
     *
     * @memberof GlobalHeaderProps
     */
    onCollapse: () => void
}

export default class GlobalHeader extends PureComponent<GlobalHeaderProps> {
    /**
     * 用户信息
     *
     * @private
     * @type {*}
     * @memberof GlobalHeader
     */
    private $currentUser: any;

    /**
     * http对象
     *
     * @private
     * @type {IBizHttp}
     * @memberof GlobalHeader
     */
    private $http: IBizHttp = IBizHttp.getInstance();

    constructor(props) {
        super(props);
    }

    public componentDidMount(): void {
        this.getUserInfo();
    }
    
    /**
     * 菜单点击
     *
     * @private
     * @memberof GlobalHeader
     */
    private menuClick = ({ key }) => {
        if (Object.is(key, 'logout')) {
            IBizNotification.confirm('退出', '确认退出系统?').then((res) => {
                if (Object.is(res, 'OK')) {
                    this.logOut();
                }
            });
            return;
        }

        const { onMenuClick } = this.props;
        if (onMenuClick) {
            onMenuClick(key);
        }
    }

    /**
     * 登录
     *
     * @private
     * @memberof GlobalHeader
     */
    private getUserInfo(): void {
        // 非本地开发获取用户信息
        if (IBizEnvironment.LocalDeve) {
            const userinfo = window.localStorage.getItem('userinfo');
            if (userinfo) {
                this.$currentUser = JSON.parse(userinfo);
            }
            this.tick();
        } else {
            this.$http.post(IBizEnvironment.AppLogin, { srfaction: 'getcuruserinfo' }).then((result) => {
                if (result && result.ret === 0) {
                    if (Object.keys(result.data).length !== 0) {
                        this.$currentUser = result.data;
                    }
                }
                this.tick();
            }, (error) => {
                console.log(error)
            });
        }
    }

    /**
     * 退出
     *
     * @private
     * @memberof GlobalHeader
     */
    private logOut(): void {
        const curUrl: string = encodeURIComponent(window.location.href);
        if (IBizEnvironment.UacAuth) {
            window.location.href = `../api/uacloginout.do?RU=${curUrl}`;
        } else if (IBizEnvironment.LocalDeve) {
            this.clearUserInfo();
            let loc = window.location;
            loc.href = `${loc.protocol}//${loc.host}#/login?RU=${curUrl}`;
        } else {
            window.location.href = `..${IBizEnvironment.Logout}?RU=${curUrl}`;
        }
    }

    /**
     * 清除本地缓存的用户信息
     *
     * @private
     * @memberof GlobalHeader
     */
    private clearUserInfo(): void {
        const ls = window.localStorage;
        ls.clear();
        this.$currentUser = undefined;
    }

    public render() {
        const { collapsed, onCollapse } = this.props;
        const menu = (
            <Menu className='menu' selectedKeys={[]} onClick={this.menuClick}>
                <Menu.Item disabled>
                    <Icon type='user' />个人中心
                </Menu.Item>
                <Menu.Item disabled>
                    <Icon type='setting' />设置
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key='logout'>
                    <Icon type='logout' />退出登录
                </Menu.Item>
            </Menu>
        );
        return (
            <div className='header'>
                <Icon
                    className='trigger'
                    type={collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={onCollapse}
                />
                <div className='right'>
                    {this.$currentUser ? (
                        <Dropdown overlay={menu}>
                            <span className="action account">
                                <Avatar size='small' className='avatar' icon="user" />
                                <span className='name'>{this.$currentUser.loginname}</span>
                            </span>
                        </Dropdown>
                    ) : (
                            <Spin size='small' style={{ marginLeft: 8 }} />
                        )}
                </div>
            </div>
        );
    }

    /**
     * 变更检测
     *
     * @private
     * @memberof GlobalHeader
     */
    private tick(): void {
        this.setState({
            date: new Date()
        });
    }

}
