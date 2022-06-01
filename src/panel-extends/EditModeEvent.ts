import { BusEventWithPayload } from "@grafana/data";

export class EditModeStarted extends BusEventWithPayload<number> {
    static type = 'panel-edit-started';
}
