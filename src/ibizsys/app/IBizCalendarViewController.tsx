import { IBizMainViewController } from "ibizsys";
import { IBizEvent } from "../IBizEvent";

export class IBizCalendarViewController extends IBizMainViewController {

    public onInitComponents(): void {
        super.onInitComponents();
        const calendar = this.getMDCtrl();
        if (calendar) {
            // 单击行数据
            calendar.on(IBizEvent.IBizCalendar_CLICK).subscribe((args) => {
                // if (this.getGridRowActiveMode() === 1) {
                    // this.onDataActivated(args[0]);
                // }
            });
        }
    }

    public onLoad(): void {
        super.onLoad();
        if (this.isLoadDefault()) {
            this.load();
        }
    }

    public load(opt: any = {}): void {
        if (this.getMDCtrl()) {
            this.getMDCtrl().load(opt);
        }
    }

    public isLoadDefault(): boolean {
        return true;
    }

    public getMDCtrl(): any {
        return this.getControl('calendar');
    }
}