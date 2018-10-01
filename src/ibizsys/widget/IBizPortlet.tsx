import { IBizControl } from "./IBizControl";

export class IBizPortlet extends IBizControl {

    /**
     * 当前门户部件所有控制器
     *
     * @private
     * @type {Map<string, any>}
     * @memberof IBizPortlet
     */
    private $controls: Map<string, any> = new Map();

    /**
     * Creates an instance of IBizPortlet.
     * @param {*} props
     * @param {*} context
     * @memberof IBizPortlet
     */
    constructor(props: any, context: any, opts: any = {}) {
        super(props, context,opts);
    }

    /**
     * 加载数据
     *
     * @param {*} [opts={}]
     * @memberof IBizPortlet
     */
    public load(opts: any = {}): void {
        this.$controls.forEach((ctrl) => {
            if (ctrl.load && typeof ctrl.load === 'function') {
                ctrl.load(opts);
            }
        });
    }

    /**
     * 注册部件
     *
     * @protected
     * @param {string} name
     * @param {*} ctrl
     * @memberof IBizPortlet
     */
    protected regControl(name: string, ctrl: any): void {
        this.$controls.set(name, ctrl);
    }

    /**
     * 获取部件控制器
     *
     * @param {string} name
     * @returns {*}
     * @memberof IBizPortlet
     */
    public getControl(name: string): any {
        return this.$controls.get(name);
    }

}