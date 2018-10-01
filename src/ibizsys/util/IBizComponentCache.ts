import { asyncComponent } from "../components/async-component/async-component";

export class IBizComponentCache {
    /**
     * 当视图路由已经激活过的组件, 避免多次异步加载同一组件
     *
     * @private
     * @type {Map<string, any>}
     * @memberof IBizShellViewController
     */
    private activated: Map<string, any> = new Map();

    /**
     * 加载组件并缓存, 再次加载时从缓存中取出
     *
     * @param {string} name 组件名称
     * @param {*} asyncCom 异步方法例：import('@pages/base-test/book-grid-view/book-grid-view.shell'))
     * @memberof IBizComponentCache
     */
    public load(name: string, asyncCom): any {
        return this.loadAsyncComponent(name, asyncCom);
    }

    /**
     * 加载异步组件，并存储
     *
     * @private
     * @param {string} name
     * @param {*} asyncCom
     * @returns
     * @memberof IBizShellViewController
     */
    private loadAsyncComponent(name: string, asyncCom): any {
        let com = this.activated.get(name);
        if (!com) {
            com = asyncComponent(() => asyncCom);
            this.activated.set(name, com);
        }
        return com;
    }

    /**
     * 返回激活过的组件
     *
     * @returns {Map<string, any>}
     * @memberof IBizShellViewController
     */
    public getActivated(): Map<string, any> {
        return this.activated;
    }

}