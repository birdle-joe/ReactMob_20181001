import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Subject, Observable } from 'rxjs';
import { ModalProps } from 'antd/lib/modal';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import './ibiz-modal.less';
import { Modal } from 'antd-mobile';
/**
 * 全局模态框对象
 *
 * @export
 * @class IBizModal
 */
export class IBizModal {

    /**
     * 单例实例对象
     *
     * @private
     * @static
     * @memberof IBizModal
     */
    private static readonly $IBizModal = new IBizModal();

    /**
     * 容器
     *
     * @private
     * @type {Element}
     * @memberof IBizModal
     */
    private $container: Element;

    /**
     * Creates an instance of IBizModal.
     * @memberof IBizModal
     */
    constructor() {
        if (IBizModal.$IBizModal) {
            return IBizModal.$IBizModal;
        }
        this.init();
    }

    /**
     * 初始化
     *
     * @memberof IBizModal
     */
    private init(): void {
        this.$container = document.createElement('div');
        this.$container.setAttribute('id', 'ibiz_modal');
        document.body.appendChild(this.$container);
    }

    /**
     * 以模态形式打开视图
     *
     * @param {string} path
     * @param {*} [params={}]
     * @memberof IBizModal
     */
    public openModal(asyncImport: () => any, params: any = {}, config: ModalProps = {}): Observable<any> {
        const _subject: Subject<any> = new Subject();
        if (asyncImport && asyncImport instanceof Function) {
            this.createModal(_subject, asyncImport, params, config);
        }
        return _subject.asObservable();
    }

    /**
     * 新建模态框
     *
     * @private
     * @param {Subject<any>} _subject
     * @param {Function} asyncImport
     * @param {*} [params={}]
     * @param {ModalProps} [config={}]
     * @memberof IBizModal
     */
    private async createModal(_subject: Subject<any>, asyncImport: () => any, params: any = {}, config: ModalProps = {}) {
        const { default: mod } = await asyncImport();
        if (!mod) {
            return;
        }
        // 模态id
        const uuid = this.createUUID();
        // 为新的模态框创建容器
        const _div = document.createElement('div');
        _div.setAttribute('id', uuid);
        this.$container.appendChild(_div);
        // 当前模态框销毁方法
        const _destroy = () => {
            let _container = document.getElementById(uuid);
            if (_container) {
                ReactDOM.unmountComponentAtNode(_container);
                this.$container.removeChild(_container);
            }
        };
        // ant模态框props参数
        const modeConfig: ModalProps = {
            width: window.innerWidth - (window.innerWidth * 0.2),
            keyboard: false,
            maskClosable: false,
            ...config
        };
        const modalClose = (res: {ret: 'OK' | 'CANCEL', params?: any}) => {
            _subject.next(res);
            if (!res) {
                return;
            }
            if (Object.is(res.ret, 'OK') || Object.is(res.ret, 'CANCEL') ) {
                _destroy();
            }
        };

        // 绘制
        const C: any = mod;
        ReactDOM.render(
            <HashRouter>
                <LocaleProvider locale={zh_CN}>
                <Modal visible={this.modalStatus} transparent maskClosable={true} onClose={this.onCloseModal}  className={'modal-class'}  
                >
                         <C modalParam={params} modalClose={modalClose}/> 
                </Modal>
                </LocaleProvider>
            </HashRouter>,
            _div
        );
    }

    
    private modalStatus: any = true;

    /**
     * 切换菜单
     *
     * @memberof IBizIndexViewController
     */
    public onCloseModal = () => {

    }


    /**
     * 创建唯一id
     *
     * @private
     * @returns {string}
     * @memberof IBizModal
     */
    private createUUID(): string {
        const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    /**
     * 返回实例对象
     *
     * @returns {IBizModal}
     * @memberof IBizModal
     */
    public static getInstance(): IBizModal {
        return IBizModal.$IBizModal;
    }

}