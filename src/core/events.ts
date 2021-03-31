import { Subject, Observable } from 'rxjs';

export abstract class Event {
    public type: string;

    constructor(type: string) {
        this.type = type;
    }
}

export class Events {
    private events: Subject<Event>;

    constructor() {
        this.events = new Subject<Event>();
    }

    listen(): Observable<Event> {
        return this.events;
    }

    dispatch(action: Event) {
        this.events.next(action);
    }
}
