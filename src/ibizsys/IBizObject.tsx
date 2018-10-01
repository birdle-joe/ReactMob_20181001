import React, { Component } from 'react';
import { Subject, Observable } from 'rxjs';
import { IBizHttp } from './service/IBizHttpService';
import { IBizAppService } from './service/IBizAppService';

export class IBizObject extends Component<any, any> {
    /**
     * 应用级服务
     *
     * @protected
     * @type {IBizAppService}
     * @memberof IBizViewController
     */
    protected $iBizApp: IBizAppService = IBizAppService.getInstance();
    /**
     * 事件组
     *
     * @private
     * @type {*}
     * @memberof IBizObject
     */
    private events: Map<string, any> = new Map();

    /**
     * http请求对象
     *
     * @type {IBizHttp}
     * @memberof IBizObject
     */
    public $ibizHttp: IBizHttp = IBizHttp.getInstance();

    /**
     * Creates an instance of IBizObject.
     * @param {*} props
     * @param {*} context
     * @param {*} opt
     * @memberof IBizObject
     */
    constructor(props: any, context: any, opt: any) {
        super(props, context);
    }

    /**
     * 注册事件
     *
     * @param {string} eventName
     * @returns {Observable<any>}
     * @memberof IBizController
     */
    public on(eventName: string): Observable<any> {
        if (eventName && !Object.is(eventName, '')) {
            if (!this.events.get(eventName)) {
                const subject: Subject<any> = new Subject();
                this.events.set(eventName, subject);
                return subject.asObservable();
            }
            return this.events.get(eventName).asObservable();
        }
        throw new Error(`注册事件名称不能为空`);
    }

    /**
     * 发送事件
     *
     * @param {string} eventName
     * @param {*} [datas={}]
     * @memberof IBizController
     */
    public fire(eventName: string, datas: any = {}): void {
        const subject: Subject<any> = this.events.get(eventName);
        if (subject) {
            subject.next(datas);
        }
    }

    /**
     * 状态更新，更新UI
     *
     * @memberof IBizObject
     */
    protected tick(): void {
        this.setState({
            date: new Date()
        });
    }

    /**
     * 组件绘制
     *
     * @returns
     * @memberof IBizObject
     */
    public render() {
        return <></>;
    }

}