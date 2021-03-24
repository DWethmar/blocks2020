import { GameEngine, POSITION_COMPONENT } from '../game_engine';
import { System } from '../../core/system';

import { FOLLOW_COMPONENT } from './follow';

export class FollowSystem implements System {
    constructor() {}

    onAttach(engine: GameEngine) {}

    update(engine: GameEngine, deltaTime: number) {
        for (const c of engine.getComponentsByType(FOLLOW_COMPONENT)) {
            const p = engine.getComponent(c.gameObjectID, POSITION_COMPONENT);

            if (!p) continue;

            const SPEED = 1;

            const target = c.data.target;
            const position = p.data.position;

            // subtract (= difference vector)
            var dx = target.x - position.x;
            var dy = target.y - position.y;

            // normalize (= direction vector)
            // (a direction vector has a length of 1)
            var length = Math.sqrt(dx * dx + dy * dy);
            if (length) {
                dx /= length;
                dy /= length;
            }

            // move
            // delta is the elapsed time in seconds
            // SPEED is the speed in units per second (UPS)
            p.data.velocity.x = dx * SPEED;
            p.data.velocity.y = dy * SPEED;

            engine.updateComponent(c);

            // const maxSpeed = 2;
            // const speed = 0.2;

            // const x = Math.floor(p.data.position.x);
            // const y = Math.floor(p.data.position.y);

            // const tx = Math.floor(c.data.target.x);
            // const ty = Math.floor(c.data.target.y);

            // let keyUp = y != ty && y > ty;
            // let keyDown = y != ty && y < ty;

            // let keyLeft = x != tx && x > tx;
            // let keyRight = x != tx && x < tx;

            // if (keyUp && !keyDown) {
            //     if (p.data.velocity.y - speed < -maxSpeed) {
            //         p.data.velocity.y = -maxSpeed;
            //     } else {
            //         p.data.velocity.y -= speed;
            //     }
            // } else {
            //     if (p.data.velocity.y < 0) {
            //         p.data.velocity.y += speed;
            //     }
            // }

            // if (keyDown && !keyUp) {
            //     if (p.data.velocity.y + speed > maxSpeed) {
            //         p.data.velocity.y = maxSpeed;
            //     } else {
            //         p.data.velocity.y += speed;
            //     }
            // } else {
            //     if (p.data.velocity.y > 0) {
            //         p.data.velocity.y -= speed;
            //     }
            // }

            // if (keyLeft && !keyRight) {
            //     if (p.data.velocity.x - speed < -maxSpeed) {
            //         p.data.velocity.x = -maxSpeed;
            //     } else {
            //         p.data.velocity.x -= speed;
            //     }
            // } else {
            //     if (p.data.velocity.x < 0) {
            //         p.data.velocity.x += speed;
            //     }
            // }

            // if (keyRight && !keyLeft) {
            //     if (p.data.velocity.x + speed > maxSpeed) {
            //         p.data.velocity.x = maxSpeed;
            //     } else {
            //         p.data.velocity.x += speed;
            //     }
            // } else {
            //     if (p.data.velocity.x > 0) {
            //         p.data.velocity.x -= speed;
            //     }
            // }

            // p.data.velocity.y = Math.round(p.data.velocity.y * 1000) / 1000;
            // p.data.velocity.x = Math.round(p.data.velocity.x * 1000) / 1000;

            // engine.updateComponent(c);
        }
    }
}
