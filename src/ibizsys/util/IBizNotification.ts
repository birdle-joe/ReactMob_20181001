import { notification, Modal } from 'antd';
import { Toast } from 'antd-mobile';

/**
 * 消息提示工具类
 * 参考地址： https://ant.design/components/notification-cn/
 * 
 * @export
 * @class IBizNotification
 */
export class IBizNotification {

    constructor() { }

    /**
     * 不带图标的提示
     * 
     * @param {string} title 标题
     * @param {string} content 内容
     * @memberof IBizNotification
     */
    public static blank(title: string, content: string) {
        // notification.open({ message: title, description: content });
        Toast.info(content);
    }

    /**
     * 成功提示
     * 
     * @param {string} title 标题
     * @param {string} content 内容
     * @memberof IBizNotification
     */
    public static success(title: string, content: string) {
        // notification.success({ message: title, description: content });
        Toast.success(content);
    }

    /**
     * 失败提示
     * 
     * @param {string} title 标题
     * @param {string} content 内容
     * @memberof IBizNotification
     */
    public static error(title: string, content: string) {
        // notification.error({ message: title, description: content });
        Toast.fail(content);
    }

    /**
     * 警告提示
     * 
     * @param {string} title 标题
     * @param {string} content 内容
     * @memberof IBizNotification
     */
    public static warning(title: string, content: string) {
        // notification.warning({ message: title, description: content });
        Toast.info(content);
    }

    /**
     * 信息提示
     * 
     * @param {string} title 标题
     * @param {string} content 内容
     * @memberof IBizNotification
     */
    public static info(title: string, content: string) {
        // notification.info({ message: title, description: content });
        Toast.info(content);
    }

    /**
     *
     *
     * @static
     * @param {string} title
     * @param {string} content
     * @returns {(Promise<'OK' | 'CANCEL'>)}
     * @memberof IBizNotification
     */
    public static confirm(title: string, content: string): Promise<'OK' | 'CANCEL'> {
        return new Promise((resolve) => {
            Modal.confirm({
                title,
                content,
                okText: '确认',
                cancelText: '取消',
                onOk() {
                    resolve('OK');
                },
                onCancel() {
                    resolve('CANCEL');
                }
            });
        });
    }
}
