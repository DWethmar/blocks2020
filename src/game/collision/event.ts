import { Event } from '../../core/events';
import { Collider } from './collider';

export class CollisionEvent extends Event {
    constructor(public a: Collider, public b: Collider) {
        super('CollisionEvent');
    }
}
