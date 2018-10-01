import fetch from 'dva/fetch';
// import { IBizNotification } from '../util/IBizNotification';
// import { IBizLoading } from '../components/ibiz-loading/ibiz-loading';
import { IBizEnvironment } from '../../environments/IBizEnvironment';
// import { IBizAppService } from './IBizAppService';
/**
 * 单例模式Http请求封装
 *
 * @export
 * @class IBizHttp
 */
export class IBizHttp {
    /**
     * 单例模式实例
     *
     * @private
     * @static
     * @memberof IBizHttp
     */
    private static readonly $ibizhttp = new IBizHttp();
    /**
     * 应用服务
     *
     * @private
     * @type {IBizAppService}
     * @memberof IBizHttp
     */
    // private $iBizApp: IBizAppService = IBizAppService.getInstance();
    /**
     * 未登录报错次数，避免多次拼接url，导致回调地址异常。
     *
     * @private
     * @type {number}
     * @memberof IBizHttp
     */
    private noLoginCount: number = 0;
    /**
     * 状态信息
     *
     * @private
     * @static
     * @memberof IBizHttp
     */
    private codeMessage = {
        200: '服务器成功返回请求的数据。',
        201: '新建或修改数据成功。',
        202: '一个请求已经进入后台排队（异步任务）。',
        204: '删除数据成功。',
        400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
        401: '用户没有权限（令牌、用户名、密码错误）。',
        403: '用户得到授权，但是访问是被禁止的。',
        404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
        406: '请求的格式不可得。',
        410: '请求的资源被永久删除，且不会再得到的。',
        422: '当创建一个对象时，发生一个验证错误。',
        500: '服务器发生错误，请检查服务器。',
        502: '网关错误。',
        503: '服务不可用，服务器暂时过载或维护。',
        504: '网关超时。',
    }

    /**
     * 加载动画对象
     *
     * @private
     * @memberof IBizHttp
     */
    // private $loading = IBizLoading.getInstance();

    /**
     * Creates an instance of IBizHttp.
     * @memberof IBizHttp
     */
    constructor() {
        if (IBizHttp.$ibizhttp) {
            return IBizHttp.$ibizhttp;
        }
    }

    /**
     * 获取http请求实例
     *
     * @returns
     * @memberof IBizHttp
     */
    public static getInstance() {
        return IBizHttp.$ibizhttp;
    }

    /**
     * 带loading的请求
     *
     * @param {string} url
     * @param {*} [opt={}]
     * @returns {Promise<any>}
     * @memberof IBizHttp
     */
    public post(url: string, opt: any = {}): Promise<any> {
        this.showLoading();
        return this.request(IBizEnvironment.BaseUrl + url, opt);
        return this.request(IBizEnvironment.BaseUrl + url, opt);
    }

    public postImgStream(url: string, opt: any = {}): Promise<any> {
        this.showLoading();
        return this.requestImgStream(IBizEnvironment.BaseUrl + url, opt);
        return this.request(IBizEnvironment.BaseUrl + url, opt);
    }

    /**
     * 不带loading请求
     *
     * @param {string} url
     * @param {*} [opt={}]
     * @returns {Promise<any>}
     * @memberof IBizHttp
     */
    public post2(url: string, opt: any = {}): Promise<any> {
        return this.request(IBizEnvironment.BaseUrl + url, opt);
    }

    /**
     * 检测Http请求状态
     *
     * @private
     * @static
     * @param {*} response
     * @returns
     * @memberof IBizHttp
     */
    private checkStatus(response) {
        this.loadingDestroy();
        if (response.status >= 200 && response.status < 300) {
            return response;
        }
        const errortext = this.codeMessage[response.status] || response.statusText;
        // IBizNotification.error(`请求错误 ${response.status}: ${response.url}`, errortext);
        const error: any = new Error(errortext);
        error.name = response.status;
        error.response = response;
        throw error;
    }

    /**
     * 发送http请求
     *
     * @static
     * @param {*} url 请求地址
     * @param {*} options 请求参数
     * @returns
     * @memberof IBizHttp
     */
    public request(url, options): Promise<any> {
        const defaultOptions = {
            'method': 'POST',
            'headers': {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
            'body': this.transformationOpt(options)
        };

        return fetch(url, defaultOptions)
            .then(this.checkStatus.bind(this))
            .then(response => {
                return response.json().then((res) => {
                    if (res.ret === 2 && !res.success && res.notlogin) {
                        if (this.noLoginCount !== 0) {
                            return;
                        }
                        this.noLoginCount++;
                        window.localStorage.removeItem('userinfo');
                        const curUrl: string = encodeURIComponent(window.location.href);
                        if (IBizEnvironment.UacAuth) {
                            window.location.href = `../api/uaclogin.do?RU=${curUrl}`;
                        } else if (IBizEnvironment.LocalDeve) {
                            window.localStorage.removeItem('srfloginkey');
                            let loc = window.location;
                            loc.href = `${loc.protocol}//${loc.host}#/login?RU=${curUrl}`;
                        } else {
                            window.location.href = `..${IBizEnvironment.LoginRedirect}?RU=${curUrl}`;
                        }
                    } else {
                        this.noLoginCount = 0;
                    }
                    return Promise.resolve(res);
                });
            })
            .catch(e => {
                this.loadingDestroy();
                const status = e.name;
                if (status) {
                    // IBizNotification.error('请求错误', this.codeMessage[status]);
                    return;
                }
            });
    }

    /**
     * 表单提交的模式来上传图片
     *
     * @param {*} url
     * @param {*} options
     * @returns {Promise<any>}
     * @memberof IBizHttp
     */
    public requestImgStream(url, options): Promise<any> {
        let formData = new FormData();
        formData.append("file",options);

        const defaultOptions = {
            'method': 'POST',

            'headers': {
            },
            'body': formData
        };

        return fetch(url, defaultOptions)
            .then(this.checkStatus.bind(this))
            .then(response => {
                return response.json().then((res) => {
                    if (res.ret === 2 && !res.success && res.notlogin) {
                        if (this.noLoginCount !== 0) {
                            return;
                        }
                        this.noLoginCount++;
                        window.localStorage.removeItem('userinfo');
                        const curUrl: string = encodeURIComponent(window.location.href);
                        if (IBizEnvironment.UacAuth) {
                            window.location.href = `../api/uaclogin.do?RU=${curUrl}`;
                        } else if (IBizEnvironment.LocalDeve) {
                            window.localStorage.removeItem('srfloginkey');
                            let loc = window.location;
                            loc.href = `${loc.protocol}//${loc.host}#/login?RU=${curUrl}`;
                        } else {
                            window.location.href = `..${IBizEnvironment.LoginRedirect}?RU=${curUrl}`;
                        }
                    } else {
                        this.noLoginCount = 0;
                    }
                    return Promise.resolve(res);
                });
            })
            .catch(e => {
                this.loadingDestroy();
                const status = e.name;
                if (status) {
                    // IBizNotification.error('请求错误', this.codeMessage[status]);
                    return;
                }
            });
    }

    /**
     * 格式化post请求时携带的json字符串。
     * 
     * @private
     * @param {any} opt 
     * @returns 
     * @memberof IBizHttp
     */
    private transformationOpt(opt: any = {}): string {
        let params: any = {};
        let postData: string = '';
        // 获取srfloginkey
        const loginkey: string | null = window.localStorage.getItem('srfloginkey');
        if (loginkey) {
            params.srfloginkey = loginkey;
        }
        // 添加appdata数据
        // params.srfappdata = this.$iBizApp.getAppData();
        Object.assign(params, opt);
        let keys: string[] = Object.keys(params);
        keys.forEach((key: string, index: number) => {
            let val: any = params[key];
            if (index !== 0) {
                postData += '&';
            }
            if (val instanceof Array || val instanceof Object) {
                postData += `${key}=${encodeURIComponent(JSON.stringify(val))}`;
            } else {
                postData += `${key}=${encodeURIComponent(val)}`;
            }
        });
        return postData;
    }

    /**
     * 显示加载框
     *
     * @memberof IBizHttp
     */
    public showLoading() {
        // this.$loading.show('Loading...');
    }

    /**
     * 销毁加载框
     *
     * @static
     * @memberof IBizHttp
     */
    public loadingDestroy() {
        // this.$loading.destroy();
    }

}