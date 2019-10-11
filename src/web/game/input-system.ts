import * as PIXI from 'pixi.js'
import { Engine } from './engine';
import { withLatestFrom, map, filter, buffer, take, groupBy, mergeAll, distinctUntilChanged, tap } from 'rxjs/operators';
import { ComponentType, Component } from './component';
import { System } from './system';
import { fromEvent, Observable, merge } from 'rxjs';
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
                    const name = KeyUtil.codeToKey(event.keyCode.toString());
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
                buffer(engine.frames),
                map((frames: Array<any>) => {
                    return frames.reduce((acc, curr) => {
                        return Object.assign(acc, curr);
                    }, {});
                })
            );

        var keyDowns = fromEvent(document, "keydown") as Observable<KeyboardEvent>;
        var keyUps = fromEvent(document, "keyup") as Observable<KeyboardEvent>;

        var keyPresses = merge(keyDowns, keyUps).pipe(
            tap((x) => { 
                debugger;
                console.log(x);
            }),
            groupBy(e => e.keyCode),
            map(group => group.pipe(distinctUntilChanged(null, e => e.type))),
            mergeAll()
        );
        
        engine.frames.pipe(
            withLatestFrom(
                this.keysDownPerFrame,
                engine.getComponentsByType(ComponentType.POSITION),
                keyPresses
            ),
        ).subscribe(([tick, keysDown, components, x]) => {
            
            const speed = .5;
            const maxSpeed = 9;

            components.forEach((component: Component<Position>) => {

                const keyUp     = keysDown.hasOwnProperty('w');
                const keyDown   = keysDown.hasOwnProperty('s');
                const keyLeft   = keysDown.hasOwnProperty('a');
                const keyRight  = keysDown.hasOwnProperty('d');

                console.log({
                    keyUp: keyUp,
                    keyDown: keyDown,
                    keyLeft: keyLeft,
                    keyRight: keyRight,
                });

                if (keyRight) {
                    console.log(x);
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

                engine.updateComponent(component);
            });
        });
    }
}
