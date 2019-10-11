import * as PIXI from 'pixi.js'
import { Engine } from './engine';
import { ComponentType, Component } from './component';
import { System } from './system';
import { KeyUtil } from './key-utl';
import { Position } from './point-3d';
import { KeyInput } from './key-input';
import { MovementControls } from './movement-controls';

export class InputSystem implements System {
    
    private keyInput: KeyInput;

    constructor(keyInput: KeyInput) {
        this.keyInput = keyInput;
    }

    onAttach(engine: Engine) {

    }

    update(engine: Engine, deltaTime: number) {



        engine.getComponentsByType(ComponentType.MOVEMENT_CONTROLS).forEach((component: Component<MovementControls>) => {
            const position: Component<Position> = engine.getComponent(component.gameObjectId, ComponentType.POSITION);
            if (!position) {
                return;
            }
            const maxSpeed  = component.state.maxSpeed;
            const speed     = component.state.speed;

            const keyUp     = this.keyInput.isKeyPressed('w');
            const keyDown   = this.keyInput.isKeyPressed('s');
            const keyLeft   = this.keyInput.isKeyPressed('a');
            const keyRight  = this.keyInput.isKeyPressed('d');

            if (keyUp && !keyDown) {
                if (position.state.velocity.y < -maxSpeed) {
                    position.state.velocity.y = -maxSpeed;
                } else {
                    position.state.velocity.y -= speed;
                }
            } else {
                if (position.state.velocity.y < 0) {
                    position.state.velocity.y += speed;
                }
            }

            if (keyDown && !keyUp) {
                if (position.state.velocity.y > maxSpeed) {
                    position.state.velocity.y = maxSpeed;
                } else {
                    position.state.velocity.y += speed;
                }
            } else {
                if (position.state.velocity.y > 0) {
                    position.state.velocity.y -= speed;
                }
            }

            if (keyLeft && !keyRight) {
                if (position.state.velocity.x < -maxSpeed) {
                    position.state.velocity.x = -maxSpeed;
                } else {
                    position.state.velocity.x -= speed;
                }
            } else {
                if (position.state.velocity.x < 0) {
                    position.state.velocity.x += speed;
                }
            }

            if (keyRight && !keyLeft) {
                if (position.state.velocity.x > maxSpeed) {
                    position.state.velocity.x = maxSpeed;
                } else {
                    position.state.velocity.x += speed;
                }
            } else {
                if (position.state.velocity.x > 0) {
                    position.state.velocity.x -= speed;
                }
            }

            position.state.velocity.y = Math.round(position.state.velocity.y * 1000) / 1000
            position.state.velocity.x = Math.round(position.state.velocity.x * 1000) / 1000

            engine.updateComponent(component);
        });
    }
}
