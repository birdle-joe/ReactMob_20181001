import { Observable, Subject } from 'rxjs';
import { IBizObject } from '../IBizObject';
import { IBizNotification } from 'ibizsys';
import { Modal } from 'antd-mobile';
import React from 'react';
import { IBizLoading } from 'src/ibizsys/components/ibiz-loading/ibiz-loading';
// import { IBizNotification } from '../util/IBizNotification';

export class IBizControl extends IBizObject {

    /**
     * 部件名称
     * 
     * @private
     * @type {string}
     * @memberof IBizService
     */
    private $name: string;

    private $loadingCount: number = 0;

    /**
     * 后台交互URL
     * 
     * @private
     * @type {string}
     * @memberof IBizService
     */
    private $url: string;

    protected $isLoading: boolean = false;

    /**
     * 视图控制器对象
     * 
     * @private
     * @type {*}
     * @memberof IBizService
     */
    private $viewController: any;

    /**
     * 不带图标的提示
     * 
     * @memberof IBizService
     */
    public $showBlankToast = 'BLANK';

    /**
     * 成功提示
     * 
     * @memberof IBizService
     */
    public $showSuccessToast = 'SUCCESS';

    /**
     * 失败提示
     * 
     * @memberof IBizService
     */
    public $showErrorToast = 'ERROR';

    /**
     * 警告提示
     * 
     * @memberof IBizService
     */
    public $showWarningToast = 'WANGING';

    /**
     * 信息提示
     * 
     * @memberof IBizService
     */
    public $showInfoToast = 'INFO';

    /**
     * Creates an instance of IBizControl.
     * @param {*} props
     * @param {*} context
     * @param {*} opt
     * @memberof IBizControl
     */
    constructor(props: any, context: any, opt: any) {
        super(props, context, opt);
        this.$viewController = opt.viewController;
        this.$url = opt.url;
        this.$name = opt.name;
    }

    /**
     * 设置部件名称
     * 
     * @param {any} name 
     * @memberof IBizService
     */
    public setName(name): void {
        this.$name = name;
    }

    /**
     * 获取部件名称
     * 
     * @returns {String}
     * @memberof IBizService
     */
    public getName(): string {
        return this.$name;
    }

    /**
     * 设置当前视图控制器
     * 
     * @param {any} viewController 
     * @memberof IBizService
     */
    public setViewController(viewController): void {
        this.$viewController = viewController;
    }

    /**
     * 获取当前视图控制器
     * 
     * @returns {*} 
     * @memberof IBizService
     */
    public getViewController(): any {
        if (this.$viewController) {
            return this.$viewController;
        }
        return undefined;
    }

    /**
     * 获取请求地址
     * 
     * @returns {*} 
     * @memberof IBizService
     */
    public getBackendUrl(): any {
        if (this.$url) {
            return this.$url;
        }
        if (this.getViewController()) {
            return this.getViewController().getBackendUrl();
        }
        return undefined;
    }

    /**
     * 信息提示框
     * 
     * @param {string} type 提示类型
     * @param {string} title  提示标题
     * @param {string} content  提示内容
     * @memberof IBizService
     */
    public showToast(type: string, title: string, content: string): void {
        if (Object.is(type, this.$showBlankToast)) {
            IBizNotification.blank(title, content);
        } else if (Object.is(type, this.$showSuccessToast)) {
            IBizNotification.success(title, content);
        } else if (Object.is(type, this.$showErrorToast)) {
            IBizNotification.error(title, content);
        } else if (Object.is(type, this.$showWarningToast)) {
            IBizNotification.warning(title, content);
        } else if (Object.is(type, this.$showInfoToast)) {
            IBizNotification.info(title, content);
        }
    }

    /**
     * 打开视图
     * 
     * @param {*} opt 
     * @memberof IBizService
     */
    public openView(opt: any,): void {
        this.getViewController().openView(opt);
    }

    /**
     * 确认对话框
     * 
     * @param {string} title 标题
     * @param {string} message 消息
     * @memberof IBizService
     */
    // public confirm(title: string, message: string): Promise<any> {
    //     return IBizNotification.confirm(title, message);
    //     return IBizNotification.confirm(title, message);
    // }

    // public render (){

    //     return (

    //         <Modal visible={true} transparent maskClosable={true}   title="Title">
    //         <div style={{ height: 100 }}>
    //           数据正在加载中，请稍后...<br />
    //         </div>
    //       </Modal>

    //     );
    // }

    protected isLoading(): boolean {
        return this.$isLoading;
    }


    /**
     * 获取模态框组件
     *
     * @param {string} key
     * @returns {*} 组件异步加载对象
     * @memberof IBizControl
     */
    public getModalView(key: string): any {
        return this.getViewController().getModalView(key);
    }

    /**
     * 发送post请求
     * 
     * @param {*} opt 请求参数
     * @param {*} successFunc 成功回调
     * @param {*} errorFunc 失败回掉
     * @memberof IBizService
     */
    public postUrl(url: string, opt: any): Observable<any> {
        this.mask();
        const subject: Subject<any> = new Subject();
        this.$ibizHttp.post(url, opt).then((res) => {
            this.unmask();
            subject.next(res);
        }).catch((err) => {
            this.unmask();
            subject.error(err);
        });
        return subject.asObservable();
    }

    // public postUrlzwd(url: string, opt: any): Observable<any> {
    //     this.mask();
    //     const subject: Subject<any> = new Subject();
    //     this.$ibizHttp.postzwd(url, opt).then((res) => {
    //         this.unmask();
    //         subject.next(res);
    //     }).catch((err) => {
    //         this.unmask();
    //         subject.error(err);
    //     });
    //     return subject.asObservable();
    // }
    protected mask(): void {
        // this.$loadingCount++;

        // this.$isLoading=true;
        // this.tick();


        // IBizModal.info('信息', 'mask');

        IBizLoading.getInstance().show("正在加载中");


    }
    

    protected unmask(): void {
        // this.$isLoading=false;
        // this.tick();

        IBizLoading.getInstance().destroy();
    }

    /**
     * 发送post请求不需要携带url
     * 
     * @param {*} opt 请求参数
     * @param {*} successFunc 成功回调
     * @param {*} errorFunc 失败回掉
     * @memberof IBizService
     */
    public post(opt: any): Observable<any> {
        return this.postUrl(this.getBackendUrl(), opt);
    }

    /**
     * 发送post请求,不展示加载动画
     * 
     * @param {*} opt 请求参数
     * @param {*} successFunc 成功回调
     * @param {*} errorFunc 失败回掉
     * @memberof IBizService
     */
    public post2Url(url: string, opt: any): Observable<any> {
        const subject: Subject<any> = new Subject();
        this.$ibizHttp.post2(url, opt).then((res) => {
            subject.next(res);
        }).catch((err) => {
            subject.error(err);
        });
        return subject.asObservable();
    }

    /**
     * 发送post请求不需要携带url,不展示加载动画
     * 
     * @param {*} opt 请求参数
     * @param {*} successFunc 成功回调
     * @param {*} errorFunc 失败回掉
     * @memberof IBizService
     */
    public post2(opt: any): Observable<any> {
        return this.post2Url(this.getBackendUrl(), opt);
    }

}