
import { IBizToolbar } from 'ibizsys';

import { IBizList } from "ibizsys";
/**
 * 实体列表部件服务对象
 * 
 * @export
 * @class Mdctrl
 * @extends { IBizList }
 */
export class Mdctrl extends IBizList{
  
     private pageSize;
      
    /**
     * Creates an instance of Mdctrl
     * 创建 Mdctrl实例
     * 
     * @param {*} props
     * @param {*} context
     * @memberof Mdctrl
     */
    constructor(props: any, context: any) {
        super(props, context, props.opts);
        this.pageSize = 20;
    }  
 
}
/**
 * 工具栏部件服务对象
 * 
 * @export
 * @class Righttoolbar
 * @extends { IBizToolbarControl }
 */
export class Righttoolbar extends IBizToolbar {

    /**
     * Creates an instance of Righttoolbar
     * 创建 Righttoolbar实例
     * 
     * @param {*} props
     * @param {*} context
     * @memberof Righttoolbar
     */
    constructor(props: any, context: any) {
        super(props, context, props.opts);
    }

    /**
     * 注册工具栏按钮
     * 
     * @memberof Righttoolbar
     */
    public regToolBarItems(): void {
        this.regToolBarItem({ name: 'tbitem3', caption: '新建', tag: 'New', target: '', priv: '', icon: '', iconcls: 'fa fa-file-text-o' }
);
        this.regToolBarItem({
    name: 'tbitem1', caption: '操作', text: "操作", xtype: 'splitbutton',
    menu: [{ name: 'tbitem5', caption: '帮助', tag: 'Help', target: '', priv: '', icon: '', iconcls: 'fa fa-question' }

    ]
});
    }

}

export default class {}