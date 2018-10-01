import { IBizControl } from "./IBizControl";

export class IBizPickupViewPanel extends IBizControl {
    /**
     * 是否为多选视图面板
     *
     * @private
     * @type {boolean}
     * @memberof IBizPickupViewPanel
     */
    private $isMultiSelect: boolean = true;
    /**
     * 选择部件视图选中的数据
     *
     * @private
     * @type {any[]}
     * @memberof IBizPickupViewPanel
     */
    private $selectedData: any[] = [];

    /**
     * Creates an instance of IBizPickupViewPanel.
     * @param {*} props
     * @param {*} context
     * @memberof IBizPickupViewPanel
     */
    constructor(props: any, context: any, opts: any = {}) {
        super(props, context, opts);
        // const opts = props.opts;
        if (opts.isMultiSelect === false) {
            this.$isMultiSelect = false;
        }
    }

    /**
     * 获取旧的mpicker或者picker的选中数据
     *
     * @returns {*}
     * @memberof IBizPickupViewPanel
     */
    public getOldSelected = (): any => {
        const view = this.getViewController()
        if (view) {
            const oldSelected = view.getViewParam().oldSelected;
            if (oldSelected) {
                return oldSelected;
            }
        }
        return [];
    }

    /**
     * 设置选中数据
     *
     * @memberof IBizPickupViewPanel
     */
    public onSelectedDataChange = (selected) => {
        if (selected) {
            this.$selectedData = selected;
        }
    }

    /**
     * 获取已选中数据
     *
     * @returns {any[]}
     * @memberof IBizPickupViewPanel
     */
    public getSelectedData(): any[] {
        return this.$selectedData;
    }

    /**
     * 是否为多选面板
     *
     * @returns {boolean}
     * @memberof IBizPickupViewPanel
     */
    public getIsMultiSelect(): boolean {
        return this.$isMultiSelect;
    }

}