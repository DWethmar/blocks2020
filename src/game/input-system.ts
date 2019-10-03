import * as PIXI from 'pixi.js'
import { Engine } from './engine';
import { withLatestFrom, map, filter, buffer } from 'rxjs/operators';
import { ComponentType, Component } from './component';
import { System } from './system';
import { fromEvent, Observable } from 'rxjs';
import { KeyUtil } from './key-utl';
import { Position } from './point-3d';

export class InputSystem implements System {
    
    public spritesheet: PIXI.Spritesheet;

    private keysDown: Observable<{}>;
    private keysDownPerFrame: Observable<any>;

    constructor() {
        this.keysDown = fromEvent(document, 'keydown')
            .pipe(
                map((event: KeyboardEvent) => {
                    const name = KeyUtil.codeToKey('' + event.keyCode);
                    if (name !== '') {
                        let keyMap = {};
                        keyMap[name] = event.code;
                        return keyMap;
                    } else {
                        return undefined;
                    }
                }),
                filter((keyMap) => keyMap !== undefined)
        );
    }

    async onAttach(engine: Engine) {
        this.keysDownPerFrame = this.keysDown
            .pipe(
                buffer(engine.getTick()),
                map((frames: Array<any>) => {
                    return frames.reduce((acc, curr) => {
                        return Object.assign(acc, curr);
                    }, {});
                })
            );

        engine.getTick().pipe(
            withLatestFrom(
                this.keysDownPerFrame,
                engine.getComponentsByType(ComponentType.POSITION)
            ),
        ).subscribe(([tick, keysDown, components]) => {
            
            const acceleration = .3;

            components.forEach((component: Component<Position>) => {
                if (keysDown['d']) {
                    component.state.acceleration.x += acceleration;
                } else {
                    if (component.state.acceleration.x > 0) {
                        component.state.acceleration.x -= acceleration;
                    }
                }

                if (keysDown['a']) {
                    component.state.acceleration.x -= acceleration;
                } else {
                    if (component.state.acceleration.x < 0) {
                        component.state.acceleration.x += acceleration;
                    }
                }

                if (keysDown['w']) {
                    component.state.acceleration.y -= acceleration;
                } else {
                    if (component.state.acceleration.y < 0) {
                        component.state.acceleration.y += acceleration;
                    }
                }

                if (keysDown['s']) {
                    component.state.acceleration.y += acceleration;
                } else {
                    if (component.state.acceleration.y > 0) {
                        component.state.acceleration.y -= acceleration;
                    }
                }

                engine.updateComponent(component);
            });
        });
    }
}
