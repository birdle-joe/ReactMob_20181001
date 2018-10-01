import { IBizObject } from "../IBizObject";

/**
 * 代码表对象<>
 * 
 * @export
 * @class IBizCodeList
 * @extends {IBizObject}
 */
export class IBizCodeList extends IBizObject {

    /**
     * 代码表ID
     *
     * @private
     * @type {string}
     * @memberof IBizCodeList
     */
    private $id: string;

    /**
     * 静态代码表数据
     * 
     * @type {any[]}
     * @memberof IBizCodeList
     */
    public $data: any[];

    /**
     * Creates an instance of IBizCodeList. 
     * 创建 IBizCodeList 实例
     * 
     * @param {*} [opts={}]
     * @memberof IBizCodeList
     */
    constructor(props: any, context: any, opts: any = {}) {
        super(props, context, opts);
        this.$data = [...opts.datas];
        this.$id = opts.id;
    }

    /**
     * 获取代码表ID
     * 
     * @returns {string} 
     * @memberof IBizCodeList
     */
    public getId(): string {
        return this.$id;
    }

    /**
     * 获取代码表数据
     * 
     * @returns {any[]} 
     * @memberof IBizCodeList
     */
    public getData(): any[] {
        return this.$data;
    }

    /**
     * 获取数据项的值
     * 
     * @param {string} value 
     * @param {*} cascade 
     * @returns {*} 
     * @memberof IBizCodeList
     */
    public getItemByValue(value: string, cascade?: any): any {
        let result: any = {};
        const arr: any[] = this.$data.filter(item => Object.is(item.value, value));
        if (arr.length !== 1) {
            return undefined;
        }

        result = { ...arr[0] };
        return result;
    }

    /**
     * 获取代码表文本值
     * 
     * @param {*} [item={}] 
     * @returns {string} 
     * @memberof IBizCodeList
     */
    public getCodeItemText(item: any = {}): string {
        const color = item.color;
        const textCls = item.textcls;
        const iconCls = item.iconcls;
        const realText = item.text;
        let ret = '';
        if (iconCls) {
            ret = ('<i class=\'' + iconCls + '\'></i>');
        }
        if (textCls || color) {
            ret += '<span';
            if (textCls) {
                ret += (' class=\'' + textCls + '\'');
            }
            if (color) {
                ret += (' style=\'color:' + color + '\'');
            }
            ret += '>';
            ret += realText;
            ret += '</span>';
        } else {
            ret += realText;
        }

        return ret;
    }
}