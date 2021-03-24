import { GameEngine, POSITION_COMPONENT } from '../game_engine';
import { System } from '../../core/system';

import { FOLLOW_COMPONENT } from './follow';

export class FollowSystem implements System {
    constructor() {}

    onAttach(engine: GameEngine) {}

    update(engine: GameEngine, deltaTime: number) {
        for (const c of engine.getComponentsByType(FOLLOW_COMPONENT)) {
            const p = engine.getComponent(c.gameObjectID, POSITION_COMPONENT);

            if (!p) {
                return;
            }

            console.log('Think');

            const maxSpeed = 1;
            const speed = 0.2;

            const x = Math.floor(p.data.position.x);
            const y = Math.floor(p.data.position.y);

            const tx = Math.floor(c.data.target.x);
            const ty = Math.floor(c.data.target.y);

            const keyUp = y != ty && y > ty;
            const keyDown = y != ty && y < ty;

            const keyLeft = x != tx && x > tx;
            const keyRight = x != tx && x < tx;

            if (keyUp && !keyDown) {
                if (p.data.velocity.y - speed < -maxSpeed) {
                    p.data.velocity.y = -maxSpeed;
                } else {
                    p.data.velocity.y -= speed;
                }
            } else {
                if (p.data.velocity.y < 0) {
                    p.data.velocity.y += speed;
                }
            }

            if (keyDown && !keyUp) {
                if (p.data.velocity.y + speed > maxSpeed) {
                    p.data.velocity.y = maxSpeed;
                } else {
                    p.data.velocity.y += speed;
                }
            } else {
                if (p.data.velocity.y > 0) {
                    p.data.velocity.y -= speed;
                }
            }

            if (keyLeft && !keyRight) {
                if (p.data.velocity.x - speed < -maxSpeed) {
                    p.data.velocity.x = -maxSpeed;
                } else {
                    p.data.velocity.x -= speed;
                }
            } else {
                if (p.data.velocity.x < 0) {
                    p.data.velocity.x += speed;
                }
            }

            if (keyRight && !keyLeft) {
                if (p.data.velocity.x + speed > maxSpeed) {
                    p.data.velocity.x = maxSpeed;
                } else {
                    p.data.velocity.x += speed;
                }
            } else {
                if (p.data.velocity.x > 0) {
                    p.data.velocity.x -= speed;
                }
            }

            p.data.velocity.y = Math.round(p.data.velocity.y * 1000) / 1000;
            p.data.velocity.x = Math.round(p.data.velocity.x * 1000) / 1000;

            engine.updateComponent(c);
        }
    }
}
