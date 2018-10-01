import React from 'react';
import {  Dropdown, Icon, Menu } from 'antd';
import { IBizControl } from './IBizControl';
import { IBizEvent } from '../IBizEvent';
import { NavBar, Button } from 'antd-mobile';

/**
 * 工具栏部件服务对象
 * 
 * @export
 * @class IBizToolbar
 * @extends {IBizControl}
 */
export class IBizToolbar extends IBizControl {

    /**
     * 导出起始页
     * 
     * @type {string}
     * @memberof IBizToolbar
     */
    public $exportStartPage: any;

    /**
     * 导出结束页
     * 
     * @type {string}
     * @memberof IBizToolbar
     */
    public $exportEndPage: any;

    /**
     * 工具栏按钮
     * 
     * @type {any[]}
     * @memberof IBizToolbar
     */
    public $items: any = {};

    /**
     * Creates an instance of IBizToolbar.
     * @param {*} props
     * @param {*} context
     * @param {*} [opts={}]
     * @memberof IBizToolbar
     */
    constructor(props: any, context: any, opts: any = {}) {
        super(props, context, opts);
        this.regToolBarItems();
    }

    /**
     * 注册所有工具栏按钮
     * 
     * @memberof IBizToolbar
     */
    public regToolBarItems(): void { }

    /**
     * 注册工具栏按钮
     * 
     * @param {*} [item={}] 
     * @memberof IBizToolbar
     */
    public regToolBarItem(item: any = {}): void {
        if (Object.keys(item).length > 0 && !Object.is(item.name, '')) {
            item.dataaccaction = true;
            this.$items[item.name] = item;
        }
    }

    /**
     * 获取工具栏按钮
     * 
     * @returns {any[]} 
     * @memberof IBizToolbar
     */
    public getItems(): any {
        if (!this.$items) {
            this.$items = {};
        }
        return this.$items;
    }

    /**
     * 设置工具栏按钮项是否启用
     * 
     * @param {string} name 
     * @param {boolean} disabled 
     * @memberof IBizToolbar
     */
    public setItemDisabled(name: string, disabled: boolean): void {
        if (this.$items[name]) {
            this.$items[name].disabled = disabled;
            this.tick();
        }
    }

    /**
     * 更新权限
     * 
     * @param {any} action 
     * @memberof IBizToolbar
     */
    public updateAccAction(action: any = {}): void {
        const _itemsName: any[] = Object.keys(this.$items);
        _itemsName.forEach((name: string) => {
            const priv = this.$items[name].priv;
            if ((priv && !Object.is(priv, '')) && (action && Object.keys(action).length > 0 && action[priv] !== 1)) {
                this.$items[name].dataaccaction = false;
            } else {
                this.$items[name].dataaccaction = true;
            }
        });
        this.tick();
    }

    /**
     * 工具栏导出功能设置
     * 
     * @param {string} type 
     * @param {string} [itemTag] 
     * @memberof IBizToolbar
     */
    public itemExportExcel(type: string, itemTag?: string): void {
        let params: any = { tag: type };
        if (itemTag && Object.is(itemTag, 'all')) {
            params.itemTag = 'all';
        } else if (itemTag && Object.is(itemTag, 'custom')) {
            if (!this.$exportStartPage || !this.$exportEndPage) {
                this.showToast(this.$showWarningToast, '警告', '请输入起始页');
                return;
            }
            const startPage: any = Number.parseInt(this.$exportStartPage, 10);
            const endPage: any = Number.parseInt(this.$exportEndPage, 10);
            if (Number.isNaN(startPage) || Number.isNaN(endPage)) {
                this.showToast(this.$showWarningToast, '警告', '请输入有效的起始页');
                return;
            }

            if (startPage < 1 || endPage < 1 || startPage > endPage) {
                this.showToast(this.$showWarningToast, '警告', '请输入有效的起始页');
                return;
            }
            params.exportPageStart = startPage;
            params.exportPageEnd = endPage;
            params.itemTag = 'custom';
        }
        this.fire(IBizEvent.IBizToolbar_ITEMCLICK, params);
    }
    
    /**
     * 点击按钮
     * 
     * @param {string} type  界面行为类型
     * @memberof IBizToolbar
     */
    public itemclick(name: string, type: string): void {
        if (Object.is(type, 'ToggleRowEdit')) {
            this.$items[name].rowedit = !this.$items[name].rowedit;
            this.$items[name].caption = this.$items[name].rowedit ? '启用行编辑' : '关闭行编辑';
        }
        this.fire(IBizEvent.IBizToolbar_ITEMCLICK, { tag: type });
    }

    /**
     * 获取图标
     *
     * @param {*} icon
     * @returns
     * @memberof SiderMenu
     */
    public getIcon(icon: string) {
        if (typeof icon === 'string' && (icon.indexOf('http') === 0 || icon.indexOf('https') === 0)) {
            return <img src={icon} alt='icon' className={`icon sider-menu-item-img`} />;
        }
        if (typeof icon === 'string') {
            return <i className={icon} style={{ marginRight: 3 }} />;
        }
        return icon;
    }

    /**
     * 绘制工具栏第一级
     *
     * @memberof IBizToolbar
     */
    public renderToolbarItems(items: any = {}) {
        let toolar;
        const keys: string[] = Object.keys(items);
        if (keys) {

          return ( <NavBar key="1"
                        mode="dark"
                        leftContent={[
                        // <Icon type="left" key="left"
                        // onClick={this.itemclick.bind(this, "GoBack", "GoBack")}
                        // ></Icon>,
                        // <span key='back'>返回</span>
                        <div key={"goback"} onClick={this.itemclick.bind(this, "GoBack", "GoBack")}> <i className="fa fa-arrow-left"></i>返回</div>
                        // <Button  key={"goback"} onClick={this.itemclick.bind(this, "GoBack", "GoBack")} style={{ marginRight: '4px',border: '0PX' }} ><i className="fa fa-mail-reply"></i>  返回</Button>
                        ]}
                        
                        rightContent={[


                            toolar = keys.map((key: string) => {
                                const item = this.$items[key];
                                // if (!item.caption) {
                                //     return;
                                // }
                                // let icon;
                                // if (!Object.is(item.icon, '')) {
                                //     icon = this.getIcon(item.icon);
                                // } else if (!Object.is(item.iconcls, '')) {
                                //     icon = this.getIcon(item.iconcls);
                                // }
                                // if (item.menu) {
                                //     return <Dropdown key={item.name} disabled={item.disabled} overlay={this.renderToolbarChildItems(item.menu)}>
                                //         <Button style={{ marginLeft: 8 }}>
                                //             {item.caption} <Icon type="down" />
                                //         </Button>
                                //     </Dropdown>
                                // }
                                return ( 
                                    // <Icon key="1" type="right" onClick={this.itemclick.bind(this, item.name, item.tag)}>{item.caption}</Icon>

                                    // <Button  key={item.tag} onClick={this.itemclick.bind(this, item.name, item.tag)} style={{ marginRight: '4px',border: '0PX' }} ><i className="fa fa-save"></i>  {item.caption}</Button>

                                    <div  key={item.tag} onClick={this.itemclick.bind(this, item.name, item.tag)}>{item.caption}</div>

                                     // <span key='save'>保存</span>,
                                    
                            
                                    // <NavBar key="1"
                                    //     mode="light"
                                    //     leftContent={[
                                    //     <Icon type="left" key="left"
                                    //     onClick={this.itemclick.bind(this, "GoBack", "GoBack")}
                                    //     ></Icon>,
                                    //     <span key='back'>返回</span>
                                    //     ]}
                                        
                                    //     //   onLeftClick={this.onLeftclick}
                                    //     rightContent={[
                                    //         // <Button onClick={this.onRightclick} key="1">保存</Button>,
                                    //         <span key='save'>保存</span>,
                                    //         <Icon key="1" type="right"
                                    //         //   onClick={this.onRightclick} 
                                    //         onClick={this.itemclick.bind(this, item.name, item.tag)}
                                    //         />,
                                    //     ]}
                                    // >标题</NavBar>
                                    
                                )
                            })

                            // <span key='save'>保存</span>,
                            // <Icon key="1" type="right"
                            // onClick={this.itemclick.bind(this, item.name, item.tag)}
                            // />,
                        ]}
                        >{this.props.title}
                    </NavBar>
                    )



           
        }
        return toolar;
    }

    /**
     * 绘制工具栏子菜单
     *
     * @param {any[]} [items=[]]
     * @memberof IBizToolbar
     */
    public renderToolbarChildItems(items: any[] = []) {
        const toolbarChild = items.map((item) => {
            if (!item.caption) {
                return;
            }
            let icon;
            if (!Object.is(item.icon, '')) {
                icon = this.getIcon(item.icon);
            } else if (!Object.is(item.iconcls, '')) {
                icon = this.getIcon(item.iconcls);
            }
            return <Menu.Item key={item.name} disabled={item.disabled} onClick={this.itemclick.bind(this, item.name, item.tag)}>{icon}{item.caption}</Menu.Item>;
        });
        return <Menu>{toolbarChild}</Menu>;
    }

    /**
     * 绘制工具栏
     *
     * @returns
     * @memberof IBizToolbar
     */
    public render() {
        return (
            <div className="ibiz-toolbar">{this.renderToolbarItems(this.$items)}</div>
        );
    }
}