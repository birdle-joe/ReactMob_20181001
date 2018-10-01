import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import './ibiz-breadcrumb.less';
import { IBizRouter } from '../../service/IBizRouterService';

export class IBizBreadcrumb extends Component {
    /**
     * 程序激活路由对象
     *
     * @private
     * @memberof IBizBreadcrumb
     */
    private readonly ibizrouter = IBizRouter.getInstance();
    /**
     * 定时器
     *
     * @private
     * @memberof IBizBreadcrumb
     */
    private $timer;

    constructor(props) {
        super(props);
        this.ibizrouter.routeActivateChange().subscribe(() => {
            if (this.$timer) {
                clearTimeout(this.$timer);
                this.$timer = undefined;
            }
            this.$timer = setTimeout(() => {
                this.setState({
                    date: new Date()
                });
            }, 50);
        });
    }

    private crumbRender() {
        let child;
        // 路由历史实例
        const activateRoute: any[] = this.ibizrouter.getActivateRouteData();
        if (activateRoute) {
            child = activateRoute.map(((item, index) => {
                if (activateRoute.length === (index + 1)) {
                    return <Breadcrumb.Item key={item.url}>{item.title}</Breadcrumb.Item>
                }
                return <Breadcrumb.Item key={item.url}>
                    <Link to={item.url}>{item.title}</Link>
                </Breadcrumb.Item>
            }));
        }
        return <Breadcrumb>
            {child}
        </Breadcrumb>
    }

    public render() {
        return <div style={{marginBottom: 6}}>{this.crumbRender()}</div>;
    }

}