import { IBizFormItem } from "./IBizFormItem";

/**
 * 表单分页面板
 * 
 * @export
 * @class IBizFormTabPanel
 * @extends {IBizForm}
 */
export class IBizFormTabPanel extends IBizFormItem {

    /**
     * Creates an instance of IBizFormTabPanel.
     * 创建 IBizFormTabPanel 实例
     * 
     * @param {*} [opts={}]
     * @memberof IBizFormTabPanel
     */
    constructor(opts: any = {}) {
        super(opts);
    }
}