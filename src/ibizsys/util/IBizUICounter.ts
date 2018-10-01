import { Observable, Subject } from "rxjs";
import { IBizControl } from "../widget/IBizControl";

/**
 * 计数器服务对象
 * 
 * @export
 * @class IBizUICounter
 * @extends {IBizService}
 */
export class IBizUICounter extends IBizControl {
    /**
     * 计数器改变流
     *
     * @private
     * @type {Subject<any>}
     * @memberof IBizUICounter
     */
    private $subject: Subject<any> = new Subject();

    /**
     * 定时器时间
     * 
     * @private
     * @type {*}
     * @memberof IBizUICounter
     */
    private $timer: any;

    /**
     * 定时器
     * 
     * @private
     * @type {*}
     * @memberof IBizUICounter
     */
    private $timerTag: any;

    /**
     * 计数器id
     * 
     * @private
     * @type {*}
     * @memberof IBizUICounter
     */
    private $counterId: any;

    /**
     * 计数器参数
     * 
     * @private
     * @type {*}
     * @memberof IBizUICounter
     */
    private $counterParam: any = {};

    /**
     * 最后加载数据
     * 
     * @private
     * @type {*}
     * @memberof IBizUICounter
     */
    private $lastReloadArg: any = {};

    /**
     * 计数器结果
     * 
     * @private
     * @type {*}
     * @memberof IBizUICounter
     */
    private $result: any;

    /**
     * 计数器交互数据
     *
     * @private
     * @type {*}
     * @memberof IBizUICounter
     */
    private $data: any = {};

    /**
     * Creates an instance of IBizUICounter.
     * 创建 IBizUICounter 服务对象
     * 
     * @param {*} [config={}]
     * @memberof IBizUICounter
     */
    constructor(props: any, context: any, config: any = {}) {
        super(props, context, config);
        this.$counterId = config.counterId;
        Object.assign(this.$counterParam, config.counterParam);
        this.$timer = config.timer;
        this.load();
    }

    /**
     * 加载定时器
     * 
     * @memberof IBizUICounter
     */
    private load(): void {
        if (this.$timer > 1000) {
            this.$timerTag = setInterval(() => {
                this.reload();
            }, this.$timer);
        }
        this.reload();
    }

    /**
     * 刷新计数器
     * 
     * @private
     * @param {*} [arg={}] 
     * @memberof IBizUICounter
     */
    public reload(arg: any = {}): void {
        let params: any = {};
        Object.assign(this.$lastReloadArg, arg);
        Object.assign(params, this.$lastReloadArg);
        Object.assign(params, { srfcounterid: this.$counterId, srfaction: 'FETCH', srfcounterparam: JSON.stringify(this.$counterParam) });
        this.post2(params).subscribe(
            res => {
                if (res && res.ret === 0) {
                    this.setData(res);
                }
            },
            error => {
                console.error('加载计数器异常', error);
            }
        );
    }

    /**
     * 处理数据
     * 
     * @private
     * @param {*} result 
     * @memberof IBizUICounter
     */
    private setData(result: any): void {
        this.$result = result;
        this.$data = result.data;
        this.$subject.next(this.$data);
    }

    /**
     * 订阅计数器数值改变
     *
     * @returns {Observable<any>}
     * @memberof IBizUICounter
     */
    public onCounterChange(): Observable<any> {
        return this.$subject.asObservable();
    }

    /**
     * 获取结果
     * 
     * @returns {*} 
     * @memberof IBizUICounter
     */
    public getResult(): any {
        return this.$result;
    }

    /**
     * 获取数据
     * 
     * @returns {*} 
     * @memberof IBizUICounter
     */
    public getData(): any {
        return this.$data;
    }

    /**
     * 关闭计数器
     * 
     * @memberof IBizUICounter
     */
    public close(): void {
        if (this.$timerTag !== undefined) {
            clearInterval(this.$timerTag);
            delete this.$timer;
        }
    }
}

