import { IBizListViewController } from "./IBizListViewController";
import { IBizEvent } from "../IBizEvent";

export class IBizPickupListViewController extends IBizListViewController {

    public $values: any[] = [];
    
    constructor(props: any, context: any, opts: any = {}) {
        super(props, context, opts);
    }
   
    /**
     * 注册列表点击事件
     *
     * @memberof IBizPickupListViewController
     */
    public onInitComponents(): void {
        super.onInitComponents();
        const list = this.getMDCtrl();
        if (list) {
            // 单击行数据
            list.on(IBizEvent.IBizPickerList_ROWCLICK).subscribe((args) => {
                if (args) {
                     this.onSelectProcess(args);
                }
            });
        }
    }

    /**
     *  将选中的值加入pickupPanel中
     *
     * @param {*} $selectdata
     * @memberof IBizPickupListViewController
     */
    public onSelectProcess($selectdata): void {
     
        let isMultiSelect=this.props.multiSelect;

        if($selectdata){

            this.onSelectionChange($selectdata);

            if(isMultiSelect===false)
            {
                this.props.onOK();
            }
        }
    }

    /**
     * pickupPanel方法回调，保存选中数据
     *
     * @param {any[]} args
     * @memberof IBizPickupListViewController
     */
    public onSelectionChange(args: any[]): void {
        if (args) {
            const { onSelectedChange } = this.props;
            if (onSelectedChange) {
                onSelectedChange(args);
            }
        }
    }
   
}