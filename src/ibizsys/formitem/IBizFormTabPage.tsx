import { IBizFormItem } from "./IBizFormItem";

/**
 * 表单分页部件
 *
 * @export
 * @class IBizFormTabPage
 * @extends {IBizFormItem}
 */
export class IBizFormTabPage extends IBizFormItem {

    /**
     * Creates an instance of IBizFormTabPage.
     * 创建 IBizFormTabPage 实例
     * 
     * @param {*} [opts={}]
     * @memberof IBizFormTabPage
     */
    constructor(opts: any = {}) {
        super(opts);
    }
}