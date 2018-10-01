import { IBizFormItem } from "./IBizFormItem";

/**
 * 表单直接内容
 * 
 * @export
 * @class IBizFormRawItem
 * @extends {IBizFormItem}
 */
export class IBizFormRawItem extends IBizFormItem {

    /**
     * Creates an instance of IBizFormRawItem.
     * 创建 IBizFormRawItem 实例
     * 
     * @param {*} [opts={}]
     * @memberof IBizFormRawItem
     */
    constructor(opts: any = {}) {
        super(opts);
    }
}