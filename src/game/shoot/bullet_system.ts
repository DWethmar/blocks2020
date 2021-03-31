import { GameEngine } from '../game_engine';
import { System } from '../../core/system';
import { POSITION_COMPONENT } from '../../core/component/position';
import { isDown, isLeft, isRight, isUp } from '../direction/direction';
import { BULLET_COMPONENT } from './bullet';
import { Events } from '../../core/events';
import { filter } from 'rxjs/operators';

export class BulletSystem implements System {
    private events: Events;

    constructor(events: Events) {
        this.events = events;
    }

    onAttach(engine: GameEngine) {
        this.events
            .listen()
            .pipe(filter((x) => x.type == 'CollisionEvent'))
            .subscribe((event) => {
                console.log(':D');
            });
    }

    beforeUpdate(engine: GameEngine): void {}

    update(engine: GameEngine) {
        for (const c of engine.getComponentsByType(BULLET_COMPONENT)) {
            const position = engine.getComponent(
                c.gameObjectID,
                POSITION_COMPONENT
            );
            if (!position) continue;

            const SPEED = 1.9;

            const d = c.data.direction;
            if (
                d &&
                (position.data.velocity.x == 0 || position.data.velocity.y == 0)
            ) {
                if (isUp(d)) {
                    position.data.velocity.y = -SPEED;
                }

                if (isDown(d)) {
                    position.data.velocity.y = SPEED;
                }

                if (isRight(d)) {
                    position.data.velocity.x = SPEED;
                }

                if (isLeft(d)) {
                    position.data.velocity.x = -SPEED;
                }
            }

            const delta = engine.getDeltaTime();
            position.data.position.x += position.data.velocity.x * delta;
            position.data.position.y += position.data.velocity.y * delta;

            engine.updateComponent(position);
        }
    }

    afterUpdate(engine: GameEngine): void {}
}
