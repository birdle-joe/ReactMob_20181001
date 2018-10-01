export class IBizAppService {
    /**
     * 单例对象
     *
     * @private
     * @static
     * @memberof IBizAppService
     */
    private static readonly $IBizApp = new IBizAppService();

    /**
     * 当前激活的所有视图控制器
     *
     * @private
     * @type {any[]}
     * @memberof IBizAppService
     */
    private $viewControllers: any[] = [];

    /**
     * 应用数据
     *
     * @private
     * @type {*}
     * @memberof IBizAppService
     */
    private $appdata: string = '';

    /**
     * 本地数据
     *
     * @private
     * @type {*}
     * @memberof IBizAppService
     */
    private $localdata: any = {};

    /**
     * Creates an instance of IBizAppService.
     * @memberof IBizAppService
     */
    constructor() {
        if (IBizAppService.$IBizApp) {
            return IBizAppService.$IBizApp;
        }
    }

    /**
     * appdata添加数据
     *
     * @param {*} appdata
     * @memberof IBizAppService
     */
    public setAppData(appdata: string): void {
        this.$appdata = appdata;
    }

    /**
     * 获取appdata数据
     *
     * @returns {*}
     * @memberof IBizAppService
     */
    public getAppData(): string {
        return this.$appdata;
    }

    /**
     * 添加本地数据
     *
     * @param {*} data
     * @memberof IBizAppService
     */
    public addLocalData(data: any): void {
        Object.assign(this.$localdata, data);
    }

    /**
     * 注册视图控制器
     *
     * @param {*} viewCtrl
     * @memberof IBizAppService
     */
    public setViewController(viewCtrl: any): void {
        this.$viewControllers.push(viewCtrl);
    }

    /**
     * 注销视图控制器
     *
     * @memberof IBizAppService
     */
    public popViewController(): void {
        this.$viewControllers.pop();
    }

    /**
     * 获取指定视图父视图
     *
     * @param {string} viewid
     * @returns {*}
     * @memberof IBizAppService
     */
    public getParentViewController(viewid: string): any {
        let parentView;
        this.$viewControllers.some((view, index) => {
            if (Object.is(view.getUUID(), viewid)) {
                if ((index - 1) > 0) {
                    parentView = this.$viewControllers[index - 1];
                }
                return true;
            }
            return false;
        });
        return parentView;
    }

    /**
     * 获取本地数据
     *
     * @memberof IBizAppService
     */
    public getLocalData(): void {
        return this.$localdata;
    }

    public static getInstance(): IBizAppService {
        return IBizAppService.$IBizApp;
    }

}