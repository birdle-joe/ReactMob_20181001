import React, { Component } from "react";
import { Form, Icon, Input, Button, Card } from 'antd';
import './login.less';
import { IBizEnvironment } from "../../../environments/IBizEnvironment";
import { IBizNotification, IBizHttp } from "ibizsys";
import { withRouter } from "react-router";

class Login extends Component<any, any> {
    /**
     * http对象
     *
     * @private
     * @type {IBizHttp}
     * @memberof Login
     */
    private $http: IBizHttp = IBizHttp.getInstance();
    /**
     * 重定向地址
     *
     * @private
     * @type {string}
     * @memberof Login
     */
    private $ru: string = '/';
    /**
     * 用户名
     *
     * @private
     * @type {string}
     * @memberof Login
     */
    private $username: string = '';
    /**
     * 密码
     *
     * @private
     * @type {string}
     * @memberof Login
     */
    private $password: string = '';
    /**
     * 路由对象
     *
     * @private
     * @type {*}
     * @memberof Login
     */
    private $history: any;

    constructor(props) {
        super(props);
        this.$history = props.history;
    }

    public componentDidMount(): void {
        const ru = this.getQueryString('RU');
        if (ru) {
            this.$ru = ru;
        }
        if (IBizEnvironment.LocalDeve) {
            const srfloginkey = window.localStorage.getItem('srfloginkey');
            if (srfloginkey) {
                window.location.href = this.$ru;
                return;
            }
        }
    }

    private login = () => {
        if (Object.is(this.$username, '') || Object.is(this.$password, '')) {
            IBizNotification.warning('警告', '用户名或密码不能为空');
            return;
        }
        let me = this;
        this.$http.post(IBizEnvironment.RemoteLogin, { 'username': this.$username, 'password': this.$password }).then((res) => {
            if (res.ret === 0) {
                window.localStorage.setItem('srfloginkey', res.data.loginkey);
                window.localStorage.setItem('userinfo', JSON.stringify(res.data));
                window.location.href = me.$ru;
            } else {
                IBizNotification.warning('警告', res.info);
            }
        }).catch((err) => {
            console.error(err);
        });
    }

    private nameChange = ({ target }) => {
        this.$username = target.value;
        this.tick();
    }

    private psChange = ({ target }) => {
        this.$password = target.value;
        this.tick();
    }

    private getQueryString(name: string): string | null {
        if (this.$history) {
            let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
            let r = this.$history.location.search.substr(1).match(reg);
            if (r != null) {
                return decodeURIComponent(r[2]);
            }
        }
        return null;
    }

    public render() {
        return (
            <div className="login">
                <Card title="登录" bordered={false} style={{ width: 300, height: 255 }}>
                    <Form className="login-form">
                        <Form.Item>
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} value={this.$username} onChange={this.nameChange} placeholder="请输入用户名" />
                        </Form.Item>
                        <Form.Item>
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} value={this.$password} onChange={this.psChange} type="password" placeholder="请输入密码" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.login}>登 录</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        );
    }

    private tick(): void {
        this.setState({
            date: new Date()
        });
    }

}

export default withRouter(Login);