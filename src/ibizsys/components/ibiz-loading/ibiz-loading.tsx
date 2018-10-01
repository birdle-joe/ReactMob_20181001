import React from 'react';
import ReactDOM from 'react-dom';
import { Spin } from 'antd';
import './ibiz-loading.less';
/**
 * 单例模式loading加载动画封装
 *
 * @export
 * @class IBizLoading
 */
export class IBizLoading {
    /**
     * 单例模式实例
     *
     * @private
     * @static
     * @memberof IBizLoading
     */
    private static readonly $IBizLoading = new IBizLoading();
    /**
     * 加载动画次数
     *
     * @private
     * @type {any}
     * @memberof IBizHttp
     */
    private $loadingCount: number = 0;
    /**
     * div容器
     *
     * @private
     * @type {Element}
     * @memberof IBizLoading
     */
    private $container: Element;

    /**
     * Creates an instance of IBizLoading.
     * @memberof IBizLoading
     */
    constructor() {
        if (IBizLoading.$IBizLoading) {
            return IBizLoading.$IBizLoading;
        }
        this.init();
    }

    /**
     * 初始化
     *
     * @memberof IBizLoading
     */
    public init(): void {
        this.$container = document.createElement('div');
        document.body.appendChild(this.$container);
    }

    /**
     * 获取实例
     *
     * @memberof IBizLoading
     */
    public static getInstance() {
        return IBizLoading.$IBizLoading;
    }

    /**
     * 显示加载动画
     *
     * @param {string} message
     * @memberof IBizLoading
     */
    public show(message: string): void {
        if (this.$loadingCount > 0) {
            return;
        }
        ReactDOM.render(
            <div className="loading-content" style={{height: window.innerHeight, width: window.innerWidth}}>
                <Spin tip={message} style={{ marginTop: window.innerHeight / 2 }} />
            </div>,
            this.$container
        );
        this.$loadingCount++;
    }

    /**
     * 隐藏加载动画
     *
     * @memberof IBizLoading
     */
    public destroy(): void {
        setTimeout(() => {
            this.$loadingCount--;
            if (this.$loadingCount < 0) {
                this.$loadingCount = 0;
            }
            if (this.$loadingCount === 0) {
                ReactDOM.unmountComponentAtNode(this.$container);
            }
        }, 300);
    }

}