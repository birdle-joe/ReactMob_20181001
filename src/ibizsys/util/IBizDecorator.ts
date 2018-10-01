import { IBizRouter } from "../service/IBizRouterService";
import { IBizEnvironment } from "../../environments/IBizEnvironment";

/**
 * IBiz视图装饰器
 *
 * @export
 * @param {string} [viewTitle='']
 * @returns
 */
export function IBizRouteView(viewTitle: string = '') {
    // 路由历史缓存对象
    const s = IBizRouter.getInstance();
    let com: any;
    // 重载构造方法
    return function IBizClass<T extends {new(...args:any[]):{}}>(constructor:T) {
        // 为添加了装饰器的类添加方法，便于在对象实例化后做自己的处理
        const initEnd = (/*实例化后的被重载对象*/component: any) => {
            com = component;
            const props = component.props;
            if (props) {
                // 获取路由信息对象
                const { match } = props;
                if (match) {
                    // 当前视图对应的url
                    const url = match.url;
                    // 路由导航历史
                    const activateRoute = s.getActivateRouteData();
                    // 判断路由是否出现过
                    activateRoute.some((item, index) => {
                        if (Object.is(item.url, url)) {
                            activateRoute.splice(index, history.length);
                            return true;
                        }
                        return false;
                    });
                    // 加入新的路由信息
                    s.addRoute({
                        url: match.url,
                        title: viewTitle,
                        component: com
                    });
                    document.title = viewTitle + '_' + IBizEnvironment.AppName;
                }
            }
        }

        const destory = () => {
            // 路由导航历史
            s.popRoute();
        }
        // 重载后的构造方法
        return class extends constructor {
            private __init__end__ = initEnd(this);
            public componentWillUnmount = destory;
        }
    }
}