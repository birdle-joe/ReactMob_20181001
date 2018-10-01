import { IBizFormItem } from "./IBizFormItem";
import { IBizEvent } from "../IBizEvent";

/**
 * 表单关系部件
 * 
 * @export
 * @class IBizFormDRPanel
 * @extends {IBizFormItem}
 */
export class IBizFormDRPanel extends IBizFormItem {
    /**
     * 关系数据变更次数
     *
     * @private
     * @type {number}
     * @memberof IBizFormDRPanel
     */
    private $changeCount: number = 0;
    /**
     * 变更后需要刷新表格的字段
     *
     * @private
     * @type {string}
     * @memberof IBizFormDRPanel
     */
    private $refreshitems: Map<string, boolean> = new Map();

    /**
     * Creates an instance of IBizFormDRPanel.
     * 创建 IBizFormDRPanel 实例
     * 
     * @param {*} [opts={}]
     * @memberof IBizFormDRPanel
     */
    constructor(opts: any = {}) {
        super(opts);
        this.initDRPanel(opts);
    }

    /**
     * 初始化关系部件
     * 
     * @private
     * @memberof IBizDRPanelComponent
     */
    private initDRPanel(opts: any): void {
        if (this.$form) {
            const form: any = this.$form;
            form.on(IBizEvent.IBizForm_FORMLOADED).subscribe(() => {
                this.changeDRPart();
            });
            form.on(IBizEvent.IBizForm_FORMSAVED).subscribe(() => {
                this.changeDRPart();
            });

            const { refreshitems } = opts;
            if (refreshitems) {
                const items: string[] = refreshitems.split(';');
                if (items.length > 0) {
                    items.forEach((item: string) => {
                        this.$refreshitems.set(item.toLowerCase(), true);
                    });
                    form.on(IBizEvent.IBizForm_FORMFIELDCHANGED).subscribe((data) => {
                        if (form.$ignoreformfieldchange || !data) {
                            return;
                        }
                        if (this.$refreshitems.has(data.name)) {
                            this.changeDRPart();
                        }
                    });
                }
            }
        }
    }

    /**
     * 增加变更次数
     *
     * @memberof IBizFormDRPanel
     */
    public changeDRPart(): void {
        this.$changeCount++;
        this.tick();
    }

    /**
     * 获取变更次数
     *
     * @returns {number}
     * @memberof IBizFormDRPanel
     */
    public getChangeCount(): number {
        return this.$changeCount;
    }

}