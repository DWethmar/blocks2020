import * as PIXI from 'pixi.js'
import { Engine } from './engine';
import { ComponentType, Component } from './component';
import { System } from './system';
import { KeyUtil } from './key-utl';
import { Position } from './point-3d';
import { KeyInput } from './key-input';

export class InputSystem implements System {
    
    private keyInput: KeyInput;

    constructor(keyInput: KeyInput) {
        this.keyInput = keyInput;
    }

    onAttach(engine: Engine) {

    }

    update(engine: Engine, deltaTime: number) {

        const maxSpeed = 2;
        const speed = .2;

        engine.getComponentsByType(ComponentType.POSITION).forEach((component: Component<Position>) => {

            const keyUp     = this.keyInput.isKeyPressed('w');
            const keyDown   = this.keyInput.isKeyPressed('s');
            const keyLeft   = this.keyInput.isKeyPressed('a');
            const keyRight  = this.keyInput.isKeyPressed('d');

            if (keyUp && !keyDown) {
                if (component.state.velocity.y < -maxSpeed) {
                    component.state.velocity.y = -maxSpeed;
                } else {
                    component.state.velocity.y -= speed;
                }
            } else {
                if (component.state.velocity.y < 0) {
                    component.state.velocity.y += speed;
                }
            }

            if (keyDown && !keyUp) {
                if (component.state.velocity.y > maxSpeed) {
                    component.state.velocity.y = maxSpeed;
                } else {
                    component.state.velocity.y += speed;
                }
            } else {
                if (component.state.velocity.y > 0) {
                    component.state.velocity.y -= speed;
                }
            }

            if (keyLeft && !keyRight) {
                if (component.state.velocity.x < -maxSpeed) {
                    component.state.velocity.x = -maxSpeed;
                } else {
                    component.state.velocity.x -= speed;
                }
            } else {
                if (component.state.velocity.x < 0) {
                    component.state.velocity.x += speed;
                }
            }

            if (keyRight && !keyLeft) {
                if (component.state.velocity.x > maxSpeed) {
                    component.state.velocity.x = maxSpeed;
                } else {
                    component.state.velocity.x += speed;
                }
            } else {
                if (component.state.velocity.x > 0) {
                    component.state.velocity.x -= speed;
                }
            }

            component.state.velocity.y = Math.round(component.state.velocity.y * 1000) / 1000
            component.state.velocity.x = Math.round(component.state.velocity.x * 1000) / 1000

            engine.updateComponent(component);
        });
    }
}
