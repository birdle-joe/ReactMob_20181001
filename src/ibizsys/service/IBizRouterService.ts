import { Observable, Subject } from "rxjs";

export class IBizRouter {
    /**
     * 实例
     *
     * @private
     * @static
     * @memberof IBizRouter
     */
    private static $IBizRouterHistory = new IBizRouter();
    /**
     * 路由历史
     *
     * @private
     * @type {any[]}
     * @memberof IBizRouter
     */
    private activateRouteData: any[] = [];
    /**
     * 路由改变主题
     *
     * @private
     * @type {Subject<any>}
     * @memberof IBizRouter
     */
    private subject: Subject<any> = new Subject();
    /**
     * Creates an instance of IBizRouter.
     * @memberof IBizRouter
     */
    constructor() {
        if (IBizRouter.$IBizRouterHistory) {
            return IBizRouter.$IBizRouterHistory;
        }
    }
    /**
     * 添加路由历史记录
     *
     * @param {*} val
     * @memberof IBizRouter
     */
    public addRoute(val: any): void {
        this.activateRouteData.push(val);
        this.subject.next({tag: 'add', data: val, activateRoute: this.activateRouteData});
    }
    /**
     *  删除路由
     *
     * @memberof IBizRouter
     */
    public popRoute(): void {
        if (this.activateRouteData.length <= 0) {
            return;
        }
        this.activateRouteData.pop();
        this.subject.next({tag: 'pop', activateRoute: this.activateRouteData});
    }
    /**
     * 获取路由历史记录
     *
     * @returns {any[]}
     * @memberof IBizRouter
     */
    public getActivateRouteData(): any[] {
        return this.activateRouteData;
    }
    /**
     * 可订阅路由改变
     *
     * @returns {Observable<any>}
     * @memberof IBizRouter
     */
    public routeActivateChange(): Observable<any> {
        return this.subject.asObservable();
    }
    /**
     * 获取实例
     *
     * @static
     * @returns {IBizRouter}
     * @memberof IBizRouter
     */
    public static getInstance(): IBizRouter {
        return IBizRouter.$IBizRouterHistory;
    }

}