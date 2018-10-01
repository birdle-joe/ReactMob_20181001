import { IBizMainViewController } from './IBizMainViewController';

/**
 * 多项数据选择视图控制器
 * 
 * @export
 * @class IBizMPickupViewController
 * @extends {IBizMainViewController}
 */
export class IBizMPickupViewController extends IBizMainViewController {





    /**
     * Creates an instance of IBizMPickupViewController.
     * @param {*} props
     * @param {*} context
     * @param {*} [opts={}]
     * @memberof IBizMPickupViewController
     */
    constructor(props: any, context: any, opts: any = {}) {
        super(props, context, opts);
    }

    /**
     * 数据选择，确定功能
     * 
     * @memberof IBizPickupViewController
     */
    public onOK = (): void => {
        this.closeView({selected: this.getPickupViewPanel().getSelectedData()});
    }

    /**
     * 关闭显示选择视图
     * 
     * @param {*} type 
     * @memberof IBizMPickupViewController
     */
    public onCancel = (): void => {
        this.backView();
    }

    /**
     * 获取选中视图面板
     *
     * @returns {*}
     * @memberof IBizMPickupViewController
     */
    public getPickupViewPanel(): any {
        return this.getControl('pickupviewpanel');
    }
}

