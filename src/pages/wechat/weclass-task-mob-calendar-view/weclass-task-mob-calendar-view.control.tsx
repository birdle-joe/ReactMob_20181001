
import { IBizCalendar } from 'ibizsys';

/**
 * 日历服务对象
 * 
 * @export
 * @class Calendar
 * @extends { IBizList }
 */
export class Calendar extends IBizCalendar {

    constructor(props: any, context: any) {
        super(props, context, props.opts);
    }

}

export default class {}