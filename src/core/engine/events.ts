import { Subject, Observable } from 'rxjs';

export interface Action {}

export class Events {
    private events: Subject<Action>;

    constructor() {
        this.events = new Subject<Action>();
    }

    listen(): Observable<Action> {
        return this.events;
    }

    dispatch(action: Action) {
        this.events.next(action);
    }
}
