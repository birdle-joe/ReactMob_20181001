import { Component } from "react";
import { IBizRouter } from "../service/IBizRouterService";
import { IBizComponentCache } from '../util/IBizComponentCache';
import { IBizEnvironment } from "../../environments/IBizEnvironment";

export class IBizShellViewController extends Component<any> {
    // 路由历史缓存对象
    private s = IBizRouter.getInstance();
    /**
     * 组件缓存
     *
     * @protected
     * @type {IBizComponentCache}
     * @memberof IBizEditView3Controller
     */
    protected comCache: IBizComponentCache = new IBizComponentCache();
    /**
     * Creates an instance of IBizShellViewController.
     * @param {*} props
     * @memberof IBizShellViewController
     */
    constructor(props) {
        super(props);
        // 获取路由信息对象
        const { match } = props;
        if (match) {
            // 当前视图对应的url
            const url = match.url;
            // 路由导航历史
            const activateRoute = this.s.getActivateRouteData();
            // 判断路由是否出现过
            activateRoute.some((item, index) => {
                if (Object.is(item.url, url)) {
                    activateRoute.splice(index, history.length);
                    return true;
                }
                return false;
            });
            // 加入新的路由信息
            this.s.addRoute({
                url: match.url,
                title: this.getViewTitle(),
                component: this
            });
            document.title = this.getViewTitle() + '_' + IBizEnvironment.AppName;
        }
    }

    /**
     * 组件销毁前调用
     *
     * @memberof IBizShellViewController
     */
    public componentWillUnmount(): void {
        this.s.popRoute();
    }

    /**
     * 获取当前路由视图标题
     *
     * @protected
     * @returns {string}
     * @memberof IBizShellViewController
     */
    protected getViewTitle(): string {
        return '';
    }
}