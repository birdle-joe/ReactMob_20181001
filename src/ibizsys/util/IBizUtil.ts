/**
 * IBizSys平台工具类
 * 
 * @export
 * @class IBizUtil
 */
export class IBizUtil {

    /**
     * 错误提示信息
     * 
     * @static
     * @type {string}
     * @memberof IBizUtil
     */
    public static errorInfo: string | null = '';

    /**
     * 
     * 
     * @static
     * @param {*} value 
     * @param {*} op 
     * @param {*} value2 
     * @returns {boolean} 
     * @memberof IBizUtil
     */
    public static testCond(value: any, op: any, value2: any): boolean {
        if (op === 'EQ') { return value === value2; }
        if (op === 'GT') {
            let result: number = this.compare(value, value2);
            if (result !== undefined && result > 0) {
                return true;
            } else {
                return false;
            }
        }
        if (op === 'GTANDEQ') {
            let result: number = this.compare(value, value2);
            if (result !== undefined && result >= 0) {
                return true;
            } else {
                return false;
            }
        }
        if (op === 'IN') { return this.contains(value, value2); }
        if (op === 'ISNOTNULL') { return (value != null && value !== ''); }
        if (op === 'ISNULL') { return (value == null || value === ''); }
        if (op === 'LEFTLIKE') { return (value && value2 && (value.toUpperCase().indexOf(value2.toUpperCase()) === 0)); }
        if (op === 'LIKE') { return (value && value2 && (value.toUpperCase().indexOf(value2.toUpperCase()) !== -1)); }
        if (op === 'LT') {
            let result: number = this.compare(value, value2);
            if (result !== undefined && result < 0) {
                return true;
            } else {
                return false;
            }
        }
        if (op === 'LTANDEQ') {
            let result: number = this.compare(value, value2);
            if (result !== undefined && result <= 0) {
                return true;
            } else {
                return false;
            }
        }
        if (op === 'NOTEQ') { return value !== value2; }
        if (op === 'NOTIN') { return !this.contains(value, value2); }
        if (op === 'RIGHTLIKE') {
            if (!(value && value2)) {
                return false;
            }
            let nPos = value.toUpperCase().indexOf(value2.toUpperCase());
            if (nPos === -1) {
                return false;
            }
            return nPos + value2.length === value.length;
        }
        if (op === 'TESTNULL') { }
        if (op === 'USERLIKE') { }
        return false;
    }

    /**
     * 
     * 
     * @static
     * @param {any} value 
     * @param {any} value2 
     * @returns {boolean} 
     * @memberof IBizUtil
     */
    public static contains(value, value2): boolean {
        if (value && value2) {
            let arr = new Array(); // 定义一数组
            arr = value2.split(','); // 字符分割
            let S = String.fromCharCode(2); // 定义正则表达式的连接符
            let reg = new RegExp(S + value + S);
            return (reg.test(S + arr.join(S) + S));
        }
        return false;
    }

    /**
     * 
     * 
     * @static
     * @param {*} value 
     * @param {*} value2 
     * @returns {number} 
     * @memberof IBizUtil
     */
    public static compare(value: any, value2: any): number {
        let result;
        if (value && (typeof (value) === 'number' || value instanceof Number)) {
            result = this.compareNumber(value, value2);
        } else if (value && (typeof (value) === 'string' || value instanceof String)) {
            result = this.compareString(value, value2);
        } else if (value && (typeof (value) === 'boolean' || value instanceof Boolean)) {
            result = this.compareBoolean(value, value2);
        }
        return result;
    }

    /**
     * 
     * 
     * @static
     * @param {any} value 
     * @param {any} value2 
     * @returns {number} 
     * @memberof IBizUtil
     */
    public static compareNumber(value, value2): number | undefined {
        if (typeof (value2) === 'number' || value2 instanceof Number) {
            if (value > value2) {
                return 1;
            } else if (value < value2) {
                return -1;
            } else {
                return 0;
            }
        }
        return undefined;
    }

    /**
     * 
     * 
     * @static
     * @param {any} value 
     * @param {any} value2 
     * @returns {number} 
     * @memberof IBizUtil
     */
    public static compareString(value, value2): number | undefined {
        if (typeof (value2) === 'string' || value2 instanceof String) {
            return value.localeCompare(value2);
        }
        return undefined;
    }

    // static compareDate(value, value2): number {
    //     if (typeof (value2) === 'date' || value2 instanceof Date) {
    //         if (value > value2)
    //             return 1;
    //         else if (value < value2)
    //             return -1;
    //         else
    //             return 0;
    //     }
    //     return undefined;
    // }

    /**
     * 
     * 
     * @static
     * @param {any} value 
     * @param {any} value2 
     * @returns {number} 
     * @memberof IBizUtil
     */
    public static compareBoolean(value, value2): number | undefined {
        if (typeof (value2) === 'boolean' || value2 instanceof Boolean) {
            if (value === value2) {
                return 0;
            } else {
                return -1;
            }
        }
        return undefined;
    }

    /**
     *
     *
     * @static
     * @param {*} [o={}]
     * @memberof IBizUtil
     */
    public static processResult(o: any = {}): void {
        if (o.url != null && o.url !== '') {
            window.location.href = o.url;
        }
        if (o.code != null && o.code !== '') {
            // tslint:disable-next-line:no-eval
            eval(o.code);
        }

        if (o.downloadurl != null && o.downloadurl !== '') {
            let downloadurl = this.parseURL2('', o.downloadurl, '');
            this.download(downloadurl);
        }
    }

    /**
     * 下载文件
     * 
     * @static
     * @param {string} url 
     * @memberof IBizUtil
     */
    public static download(url: string): void {
        window.open(url, '_blank');
    }

    /**
     * 
     * 
     * @static
     * @param {any} subapp 
     * @param {any} url 
     * @param {any} params 
     * @returns {string} 
     * @memberof IBizUtil
     */
    public static parseURL2(subapp, url: string, params: any): string {
        let tmpURL;
        // let root;
        // if (subapp) {
        //     root = WEBROOTURL;
        // } else {
        //     root = BASEURL;
        // }

        // if (url.toLowerCase().indexOf('http') !== -1) {
        //     tmpURL = url;
        // } else {
        //     tmpURL = root + '/jsp' + url;
        // }

        if (url.indexOf('../../') !== -1) {
            tmpURL = url.substring(url.indexOf('../../') + 6, url.length);
        } else if (url.indexOf('/') === 0) {
            tmpURL = url.substring(url.indexOf('/') + 1, url.length);
        } else {
            tmpURL = url;
        }

        if (params) {
            return tmpURL + (url.indexOf('?') === -1 ? '?' : '&'); // + $.param(params);
        } else {
            return tmpURL;
        }
    }

    /**
     * 是否是数字
     * 
     * @param {*} num 
     * @returns {boolean} 
     * @memberof IBizUtil
     */
    public static isNumberNaN(num: any): boolean {
        return Number.isNaN(num) || num !== num;
    }

    /**
     * 是否未定义
     * 
     * @static
     * @param {*} value 
     * @returns {boolean} 
     * @memberof IBizUtil
     */
    public static isUndefined(value: any): boolean {
        return typeof value === 'undefined';
    }

    /**
     * 是否为空
     * 
     * @static
     * @param {*} value 
     * @returns {boolean} 
     * @memberof IBizUtil
     */
    public static isEmpty(value: any): boolean {
        return this.isUndefined(value) || value === '' || value === null || value !== value;
    }

    /**
     * 检查属性常规条件
     * 
     * @static
     * @param {string} value 属性值
     * @param {*} op 检测条件
     * @param {*} value2 预定义值
     * @param {string} errorInfo 错误信息
     * @param {boolean} primaryModel 是否必须条件
     * @returns {boolean} 
     * @memberof IBizUtil
     */
    public static checkFieldSimpleRule(value: string, op: any, value2: any, errorInfo: string, primaryModel: boolean): boolean {
        if (this.isEmpty(errorInfo)) {
            errorInfo = '内容必须符合值规则';
        } else {
            this.errorInfo = errorInfo;
        }
        return this.testCond(value, op, value2);
    }

    /**
     * 检查属性字符长度规则
     * 
     * @static
     * @param {*} viewValue 
     * @param {number} minLength 
     * @param {boolean} indexOfMin 
     * @param {number} maxLength 
     * @param {boolean} indexOfMax 
     * @param {string} errorInfo 
     * @param {boolean} primaryModel 
     * @returns {boolean} 
     * @memberof IBizUtil
     */
    public static checkFieldStringLengthRule(viewValue: string, minLength: number, indexOfMin: boolean, maxLength: number, indexOfMax: boolean, errorInfo: string, primaryModel: boolean): boolean {

        if (this.isEmpty(errorInfo)) {
            this.errorInfo = '内容长度必须符合范围规则';
        } else {
            this.errorInfo = errorInfo;
        }

        const isEmpty = IBizUtil.isEmpty(viewValue);
        if (isEmpty) {
            if (!primaryModel) {
                return false;
            }
            this.errorInfo = '值为空';
            return true;
        }

        const viewValueLength: number = viewValue.length;

        // 小于等于
        if (minLength !== null) {
            if (indexOfMin) {
                if (viewValueLength < minLength) {
                    if (!primaryModel) {
                        return false;
                    }
                    return true;
                }
            } else {
                if (viewValueLength <= minLength) {
                    if (!primaryModel) {
                        return false;
                    }
                    return true;
                }
            }
        }

        //  大于等于
        if (maxLength !== null) {
            if (indexOfMax) {
                if (viewValueLength > maxLength) {
                    if (!primaryModel) {
                        return false;
                    }
                    return true;
                }
            } else {
                if (viewValueLength >= maxLength) {
                    if (!primaryModel) {
                        return false;
                    }
                    return true;
                }
            }
        }

        this.errorInfo = '';
        return false;
    }

    /**
     * 检查属性值正则式规则
     * 
     * @static
     * @param {string} viewValue 属性值
     * @param {*} strReg 验证正则
     * @param {string} errorInfo 错误信息
     * @param {boolean} primaryModel 是否关键条件
     * @returns {boolean} 
     * @memberof IBizUtil
     */
    public static checkFieldRegExRule(viewValue: string, strReg: any, errorInfo: string | null, primaryModel: boolean): boolean {

        if (this.isEmpty(errorInfo)) {
            this.errorInfo = '值必须符合正则规则';
        } else {
            this.errorInfo = errorInfo;
        }
        const isEmpty = IBizUtil.isEmpty(viewValue);
        if (isEmpty) {
            if (!primaryModel) {
                return false;
            }
            this.errorInfo = '值为空';
            return true;
        }
        const regExp = new RegExp(strReg);
        if (!regExp.test(viewValue)) {
            if (!primaryModel) {
                return false;
            }
            return true;
        }

        this.errorInfo = '';
        return false;
    }

    /**
     * 检查属性值范围规则
     * 
     * @static
     * @param {string} viewValue 属性值
     * @param {*} minNumber 最小数值
     * @param {boolean} indexOfMin 是否包含最小数值
     * @param {*} maxNumber 最大数值
     * @param {boolean} indexOfMax 是否包含最大数值
     * @param {string} errorInfo 错误信息
     * @param {boolean} primaryModel 是否关键条件
     * @returns {boolean} 
     * @memberof IBizUtil
     */
    public static checkFieldValueRangeRule(viewValue: string, minNumber: any, indexOfMin: boolean, maxNumber: any, indexOfMax: boolean, errorInfo: string, primaryModel: boolean): boolean {

        if (this.isEmpty(errorInfo)) {
            this.errorInfo = '值必须符合值范围规则';
        } else {
            this.errorInfo = errorInfo;
        }

        const isEmpty = IBizUtil.isEmpty(viewValue);
        if (isEmpty) {
            if (!primaryModel) {
                return false;
            }
            this.errorInfo = '值为空';
            return true;
        }

        const valueFormat = this.checkFieldRegExRule(viewValue, /^-?\d*\.?\d+$/, null, primaryModel);
        if (valueFormat) {
            return true;
        } else {
            this.errorInfo = errorInfo;
        }

        const data = Number.parseFloat(viewValue);

        // 小于等于
        if (minNumber !== null) {
            if (indexOfMin) {
                if (data < minNumber) {
                    if (!primaryModel) {
                        return false;
                    }
                    return true;
                }
            } else {
                if (data <= minNumber) {
                    if (!primaryModel) {
                        return false;
                    }
                    return true;
                }
            }
        }

        // //大于等于
        if (maxNumber != null) {
            if (indexOfMax) {
                if (data > maxNumber) {
                    if (!primaryModel) {
                        return false;
                    }
                    return true;
                }
            } else {
                if (data >= maxNumber) {
                    if (!primaryModel) {
                        return false;
                    }
                    return true;
                }
            }
        }

        this.errorInfo = '';
        return false;
    }

    /**
     * 检查属性值系统值范围规则  暂时支持正则表达式
     * 
     * @static
     * @param {string} viewValue 属性值
     * @param {*} strReg 正则
     * @param {string} errorInfo  错误信息
     * @param {boolean} primaryModel 是否关键条件
     * @returns {boolean} 
     * @memberof IBizUtil
     */
    public static checkFieldSysValueRule(viewValue: string, strReg: any, errorInfo: string, primaryModel: boolean): boolean {
        return this.checkFieldRegExRule(viewValue, strReg, errorInfo, primaryModel);
    }

    /**
     * 将文本格式的xml转换为dom模式
     * 
     * @static
     * @param {string} strXml 
     * @memberof IBizUtil
     */
    public static parseXML(strXml: string): Document | undefined {
        if (strXml) {
            return new DOMParser().parseFromString(strXml, 'text/xml');
        }
        return undefined;
    }

    /**
     * 将xml转换为object对象
     * 
     * @static
     * @param {*} node 
     * @param {*} [obj={}] 
     * @memberof IBizUtil
     */
    public static loadXMLNode(node: any, obj: any = {}): void {
        if (node && node.attributes) {
            let arr: any = node.attributes;
            for (let i = 0; i < arr.length; i++) {
                let A = arr.item(i).name;
                const B = arr.item(i).value;
                A = A.toLowerCase();
                obj[A] = B;
            }
        }
    }

    /**
     * 将object转换为xml对象
     * 
     * @static
     * @param {any} XML 
     * @param {any} obj 
     * @memberof IBizUtil
     */
    public static saveXMLNode(XML, obj) {
        for (let proName in obj) {
            if (obj.hasOwnProperty(proName)) {
                let value = obj[proName];
                if (!value || value instanceof Object || typeof (value) === 'function') {
                    continue;
                }
                let proValue = obj[proName].toString();
                if (proValue !== '') {
                    XML.attrib(proName, proValue);
                }
            }
        }
    }


    public static loadXMLToJson(strXML: any): any {

        let array: any = [];

        if (typeof strXML === "undefined" || strXML === null || strXML === "") { return array; }

        let xmlNode;
        xmlNode= IBizUtil.parseXML(strXML);
        let fileNodes = xmlNode.getElementsByTagName("FILE");

        for (let fileNode of fileNodes) {
            if (fileNode && fileNode.attributes) {
                let obj: any = {};
                let nodeItems: any = fileNode.attributes;
                for (let nodeItem of nodeItems) {
                    let key = nodeItem.nodeName;
                    const value = nodeItem.nodeValue;
                    key = key.toLowerCase();
                    switch (key){
                        case 'fileid': key="id" ; break;
                        case 'filename': key="name"; break;
                    }
                   
                   
                    obj[key] = value;
                }
                array = [...array, obj];
            }
        }

        return array;
    }

    public static loadJsonToXML(jsonArray: any) :any{

        let strXML="";

        if(jsonArray instanceof Array)
        {
            let xmlheader = '<?xml version=\"1.0\" encoding=\"utf-8\"?><FILELIST>';
            let xmlbody = '';
            let xmlfooter = '</FILELIST>';
            if (jsonArray) {
                jsonArray.map((item: any, index: any) => {
                    let key = item.id;
                    let value = item.name;
                    if (key && value) {
                        xmlbody += `<FILE FILEID=\"${key}\" FILENAME=\"${value}\" />`;
                    }
                })
    
                if(xmlbody)
                {
                    strXML=xmlheader+xmlbody+xmlfooter;
                }
            }
        }
        return strXML;
    }
}